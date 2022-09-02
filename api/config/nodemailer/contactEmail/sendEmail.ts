import { EmailContent } from '../../../app/models/DTOs/EmailContent';
import transporter from '../transporter';

import * as dotenv from 'dotenv';

dotenv.config();
const user = process.env.USER;

const emailSender = async (emailContent: EmailContent): Promise<any> => {
  console.log(user);
  const mailOptions = {
    replyTo: emailContent.sender,
    to: user,
    subject: `A message from ${emailContent.fullName}`,
    text: `${emailContent.message} \n Reply to email: ${emailContent.sender} \n Reply to WhatsApp: ${emailContent.phone}`
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return info.response;
  });
};

export default emailSender;