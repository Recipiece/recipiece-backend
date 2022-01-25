import * as E from 'express';
import mailjet from 'node-mailjet';
import { Environment } from 'recipiece-common';
import { IEmail } from '../emails/email.i';

export async function sendEmail(email: IEmail) {
  if (Environment.IS_PRODUCTION) {
    const client = mailjet.connect(Environment.MAILJET_API_KEY, Environment.MAILJET_SECRET_KEY);
    await client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: Environment.SUPPORT_EMAIL,
            Name: 'Recipiece Support',
          },
          To: [
            {
              Email: email.to,
            },
          ],
          Subject: email.subject,
          TextPart: email.textContent,
        },
      ],
    });
  } else {
    console.log('Would have sent email');
    console.log(email);
  }
}
