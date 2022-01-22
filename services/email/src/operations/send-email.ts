import * as E from 'express';
import mailjet from 'node-mailjet';
import { Environment } from 'recipiece-common';

export async function sendEmail(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { to, subject, content } = req.body;
  const client = mailjet.connect(Environment.MAILJET_API_KEY, Environment.MAILJET_SECRET_KEY);
  try {
    await client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: Environment.SUPPORT_EMAIL,
            Name: 'Recipiece Support',
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: content,
        },
      ],
    });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
