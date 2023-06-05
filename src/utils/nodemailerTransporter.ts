import { configDotenv } from 'dotenv'
import { Transporter, createTransport } from 'nodemailer'

configDotenv()

const { GMAIL_USER, GMAIL_TOKEN } = process.env

const createTransporter = (): Transporter => (
  createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_TOKEN
    }
  })
)

export default createTransporter
