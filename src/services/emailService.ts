import { ContactInformation } from './../types.d'
import createTransporter from '../utils/nodemailer/nodemailer'

export const sendContactEmail = async (contactInfo: ContactInformation): Promise<string> => {
  const transporter = createTransporter()
  const originEmail = process.env.GMAIL_USER as string

  const info = await transporter.sendMail({
    replyTo: contactInfo.email,
    to: originEmail,
    subject: `${contactInfo.name} sent you a message`,
    html: `<b>message: ${contactInfo.message} phone: ${contactInfo.email}</b>`
  })

  return info.response
}

export const sendConfirmationEmail = async (contactInfo: ContactInformation): Promise<string> => {
  const transporter = createTransporter()

  const info = await transporter.sendMail({
    to: contactInfo.email,
    subject: 'Santiago received your message',
    html: '<b>I have received your message and will get in contact soon</b>'
  })

  return info.response
}
