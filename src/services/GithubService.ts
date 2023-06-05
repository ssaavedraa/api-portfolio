/* eslint-disable camelcase */
import axios, { AxiosRequestConfig } from 'axios'

import GithubServiceError from '../errors/GithubServiceError'
import { GithubRepository } from '../types/GithubRepository'
import { GithubRepositoryLanguage } from '../types/GithubRepositoryLanguage'
import { GithubRepositoryResponse } from '../types/GithubRepositoryResponse'

export class GithubService {
  private static readonly GITHUB_BASE_URL: string = process.env.GITHUB_BASE_URL as string
  private static readonly GITHUB_TOKEN: string = process.env.GITHUB_TOKEN as string
  private static readonly githubAuthorizationHeader: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${this.GITHUB_TOKEN}`
    }
  }

  static async getStarredRepositories (): Promise<GithubRepository[]> {
    try {
      const url = `${this.GITHUB_BASE_URL}/users/ssaavedraa/starred`

      const response = await axios.get<GithubRepositoryResponse[]>(url, this.githubAuthorizationHeader)

      const repositories: Promise<GithubRepository>[] = response.data
        .map(async ({ id, name, html_url, ssh_url, clone_url }) => {
          const languages = await this.getRepositoryLanguage(name)

          return {
            id,
            name,
            url: html_url,
            httpClone: clone_url,
            sshClone: ssh_url,
            languages
          }
        })

      return Promise.all(repositories)
    } catch (error) {
      console.error('Error retrieving starred repositories:', error)
      throw new GithubServiceError('Failed to retrieve starred repositories')
    }
  }

  static async getRepositoryLanguage (repositoryName: string): Promise<GithubRepositoryLanguage[]> {
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
      percentage: ((languageWeights[index] * 100) / totalWeight
      ).toFixed(2)
    }))

    return languagesWithPercentage
  }
}

export default GithubService
