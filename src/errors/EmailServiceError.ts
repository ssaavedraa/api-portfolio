class EmailServiceError extends Error {
  public status: number
  public name: string

  constructor (message: string) {
    super(message)

    this.status = 500
    this.name = 'SendEmailError'
  }
}

export default EmailServiceError
