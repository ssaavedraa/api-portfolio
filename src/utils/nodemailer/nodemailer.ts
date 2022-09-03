import nodemailer, { Transporter } from 'nodemailer'

const createTransporter = (): Transporter => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_TOKEN
    }
  })

  return transport
}

export default createTransporter
