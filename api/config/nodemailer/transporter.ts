import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const { USER, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER,
    pass: PASSWORD
  }
});

export default transporter;