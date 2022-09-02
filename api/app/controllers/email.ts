import { EmailContent } from './../models/DTOs/EmailContent';
import { Request, Response } from 'express';
import emailSender from '../../config/nodemailer/contactEmail/sendEmail';

const sendEmail = async (req: Request, res: Response) => {
  const emailContent: EmailContent = req.body;

  try {
    await emailSender(emailContent);
  } catch (error) {
    return res.status(500).send({
      error
    });
  }

  return res.status(200).send(emailContent);
};

export default sendEmail;