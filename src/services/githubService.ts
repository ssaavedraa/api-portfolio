import axios from 'axios'
import { GithubRepository, GithubRepositoryLanguage, LanguagesWithPercentage } from '../types.d'

const githubBaseUrl = 'https://api.github.com'

const githubAuthorizationHeader = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN as string}`
  }
}

export const getStarredRepositories = async (): Promise<GithubRepository[]> => {
  const url = `${githubBaseUrl}/users/ssaavedraa/starred`
  const githubRawData = await axios.get(url, githubAuthorizationHeader)

  return githubRawData.data.map((repository: any) => {
    return {
      id: repository.id,
      name: repository.name,
      url: repository.html_url,
      sshClone: repository.ssh_url,
      htmlClone: repository.clone_url
    }
  })
}

export const getRepositoryLanguage = async (repositoryName: string): Promise<LanguagesWithPercentage> => {
  const url = `${githubBaseUrl}/repos/ssaavedraa/${repositoryName}/languages`
  const languages = await axios.get(url, githubAuthorizationHeader)

  return calculateLanguagePercentage(languages.data)
}

const calculateLanguagePercentage = (languages: GithubRepositoryLanguage): LanguagesWithPercentage => {
  const languageWeights: number[] = Object.values(languages)
  const languageKeys: string[] = Object.keys(languages)
  const totalWeight: number = languageWeights.reduce((partial: number, value: number): number => partial + value)
  let languagesWithPercentage: LanguagesWithPercentage = {}

  languageKeys.forEach((languageKey, index) => {
    languagesWithPercentage = {
      ...languagesWithPercentage,
      [languageKey]: ((languageWeights[index] * 100) / totalWeight).toFixed(2)
    }
  })

  return languagesWithPercentage
}
