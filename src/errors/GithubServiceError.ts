class GithubServiceError extends Error {
  public status: number
  public name: string

  constructor (message: string) {
    super(message)

    this.status = 500
    this.name = 'GithubServiceError'
  }
}

export default GithubServiceError
