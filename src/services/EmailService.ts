import { MailOptions } from 'nodemailer/lib/json-transport'

import EmailServiceError from '../errors/EmailServiceError'
import { ContactInformation } from '../types/ContactInformation'
import createTransporter from '../utils/nodemailerTransporter'

class EmailService {
  private static GMAIL_USER: string

  static initialize () {
    this.GMAIL_USER = process.env.GMAIL_USER as string
  }

  private static async sendEmail (mailOptions: MailOptions) {
    try {
      await createTransporter().sendMail(mailOptions)
    } catch (error) {
      console.error('Error sending email:', error)
      throw new EmailServiceError('Failed to send email')
    }
  }

  static async sendContactEmail (contactInformation: ContactInformation): Promise<void> {
    const mailOptions: MailOptions = {
      replyTo: contactInformation.email,
      to: this.GMAIL_USER,
      subject: `${contactInformation.name} sent you a message`,
      html: `<b>message: ${contactInformation.message}</b>`
    }

    await this.sendEmail(mailOptions)
  }

  static async sendConfirmationEmail (email: string): Promise<void> {
    const mailOptions: MailOptions = {
      to: email,
      subject: 'Santiago received your message',
      html: '<b>Thanks for getting in contact. I have received your message and will get in contact soon</b>'
    }

    await this.sendEmail(mailOptions)
  }
}

EmailService.initialize()

export default EmailService
