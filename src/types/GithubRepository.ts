import { GithubRepositoryLanguage } from './GithubRepositoryLanguage'

export interface GithubRepository {
  id: string
  name: string
  url: string
  sshClone: string
  httpClone: string
  languages: GithubRepositoryLanguage[]
}
