import express from 'express'
import * as emailService from '../services/emailService'
import { contactInformation } from '../types'

const router = express.Router()

router.post('/send-contact', (req, res) => {
  const contactInfo = req.body as contactInformation

  emailService.sendContactEmail(contactInfo)
    .then(_ => res.status(200).send('Confirmation email sent'))
    .catch((_error: any) => {
      res.status(500).send('Error sending confirmation email')
    })
})

router.post('/send-confirmation', (req, res) => {
  const contactInfo = req.body as contactInformation

  emailService.sendConfirmationEmail(contactInfo)
    .then(_ => res.status(200).send('Email sent to Santiago'))
    .catch((_error: any) => {
      res.status(500).send('Error sending email to Santiago')
    })
})

export default router
