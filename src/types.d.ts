export interface ContactInformation {
  name: string
  email: string
  message: string
}

export interface GithubRepository {
  id: number
  name: string
  url: string
  sshClone: string
  htmlClone: string
}

export interface GithubRepositoryLanguage {
  [key: string]: number
}

export interface LanguagesWithPercentage {
  [key: string]: string
}
