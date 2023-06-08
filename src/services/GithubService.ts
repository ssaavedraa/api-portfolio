/* eslint-disable camelcase */
import axios, { AxiosRequestConfig } from 'axios'
import { Language, Prisma, PrismaClient, Repository } from '@prisma/client'

import GithubServiceError from '../errors/GithubServiceError'
import { GithubRepositoryLanguage } from '../types/GithubRepositoryLanguage'
import { GithubRepositoryResponse } from '../types/GithubRepositoryResponse'
import { GithubRepository } from '../types/GithubRepository'

export class GithubService {
  private static readonly prismaClient: PrismaClient = new PrismaClient()
  private static readonly GITHUB_BASE_URL: string = process.env.GITHUB_BASE_URL as string
  private static readonly GITHUB_TOKEN: string = process.env.GITHUB_TOKEN as string
  private static readonly githubAuthorizationHeader: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${this.GITHUB_TOKEN}`
    }
  }

  static async getRepositories (): Promise<Repository[]> {
    const repositories = this.prismaClient.repository.findMany({
      include: {
        languages: {
          select: {
            language: true,
            percentage: true
          }
        }
      }
    })

    if (!repositories) {
      throw new GithubServiceError('No repositories found in database')
    }

    return repositories
  }

  static async syncDatabase (): Promise<void> {
    try {
      const remoteRepositories = await this.getStarredRepositories()
      const databaseRepositories = await this.getRepositories()

      for (const { name, url, sshClone, httpClone, languages } of remoteRepositories) {
        await this.findOrCreateRepository(
          { name, url, sshClone, httpClone },
          languages as Language[]
        )
      }

      await this.compareAndDelete(databaseRepositories, remoteRepositories)
    } catch (error) {
      console.error('Error while syncing database: ', error)
      throw new GithubServiceError('Couldn\'t sync database')
    }
  }

  static async getAllLanguages (): Promise<Partial<Language>[]> {
    const query = Prisma.sql`SELECT language, SUM(CAST(percentage AS decimal)) AS percentage
                  FROM "Language"
                  GROUP by language`

    const languages: Language[] = await this.prismaClient.$queryRaw(query)

    const languageTotal = languages.reduce((sum, { percentage }) => sum + parseFloat(`${percentage}`), 0.0)

    return languages.map(({ language, percentage }) => ({
      language,
      percentage: (percentage / languageTotal) * 100
    }))
      .sort((language1, language2) => (language2.percentage - language1.percentage))
  }

  private static async compareAndDelete (
    databaseRepositories: Repository[],
    remoteRepositories: GithubRepository[]
  ) {
    const databaseRespositoryNames = databaseRepositories.map(
      (repository) => repository.name
    )
    const remoteRespositoryNames = remoteRepositories.map(
      (repository) => repository.name
    )

    const repositoriesToDelete = databaseRespositoryNames.filter(
      (repositoryName) => (!remoteRespositoryNames.includes(repositoryName))
    )

    const repositoryIds = await this.prismaClient.repository.findMany({
      where: {
        name: {
          in: repositoriesToDelete
        }
      },
      select: {
        id: true
      }
    })

    const languageIds = await this.prismaClient.language.findMany({
      where: {
        repositoryId: {
          in: repositoryIds.map((repository) => repository.id)
        }
      },
      select: {
        id: true
      }
    })

    await this.prismaClient.language.deleteMany({
      where: {
        id: {
          in: languageIds.map((language) => language.id)
        }
      }
    })

    await this.prismaClient.repository.deleteMany({
      where: {
        name: {
          in: repositoriesToDelete
        }
      }
    })
  }

  private static async findOrCreateRepository (
    { name, url, httpClone, sshClone }: Prisma.RepositoryCreateInput,
    languages: Language[]
  ): Promise<Repository> {
    const repository = await this.prismaClient.repository.findUnique({
      where: {
        name
      }
    })

    if (!repository) {
      const newRepository = await this.prismaClient.repository.create({
        data: {
          name,
          url,
          httpClone,
          sshClone,
          languages: {
            create: languages
          }
        }
      })

      return newRepository
    }

    return repository
  }

  private static async getStarredRepositories (): Promise<GithubRepository[]> {
    try {
      const url = `${this.GITHUB_BASE_URL}/users/ssaavedraa/starred`

      const response = await axios.get<GithubRepositoryResponse[]>(url, this.githubAuthorizationHeader)

      const repositories: GithubRepository[] = []

      for (const { id, name, html_url, ssh_url, clone_url } of response.data) {
        const languages = await this.getRepositoryLanguage(name)

        repositories.push({
          id,
          name,
          url: html_url,
          httpClone: clone_url,
          sshClone: ssh_url,
          languages
        })
      }

      return repositories
    } catch (error) {
      console.error('Error retrieving starred repositories:', error)
      throw new GithubServiceError('Failed to retrieve starred repositories')
    }
  }

  private static async getRepositoryLanguage (repositoryName: string): Promise<GithubRepositoryLanguage[]> {
    try {
      const url = `${this.GITHUB_BASE_URL}/repos/ssaavedraa/${repositoryName}/languages`

      const languages = await axios.get<{[key: string]: number}>(url, this.githubAuthorizationHeader)

      return this.calculatePercentages(languages.data)
    } catch (error) {
      console.error('Error retrieving repository languages:', error)
      throw new GithubServiceError('Failed to retrieve repository languages')
    }
  }

  private static calculatePercentages (languages: {[key: string]: number}): GithubRepositoryLanguage[] {
    const languageWeights: number[] = Object.values(languages)
    const languageKeys: string[] = Object.keys(languages)

    const totalWeight: number = languageWeights.reduce((partial: number, value: number) => (partial + value), 0)

    const languagesWithPercentage = languageKeys.map((language: string, index: number) => ({
      language,
      percentage: parseFloat(((languageWeights[index] * 100) / totalWeight
      ).toFixed(2))
    }))

    return languagesWithPercentage
  }
}

export default GithubService
