import { Logger } from '@nestjs/common';
import { Environment } from '@recipiece/common';
import mailjet from 'node-mailjet';

export abstract class Email {
  protected constructor(protected readonly to: string, protected readonly subject: string) {}

  public abstract getContent(): string;

  public async send() {
    const email = {
      Messages: [
        {
          From: {
            Email: Environment.SUPPORT_EMAIL,
            Name: 'Recipiece Support',
          },
          To: [
            {
              Email: this.to,
            },
          ],
          Subject: this.subject,
          HtmlPart: this.getContent(),
        },
      ],
    };

    if (Environment.IS_PRODUCTION) {
      const client = mailjet.connect(Environment.MAILJET_API_KEY, Environment.MAILJET_SECRET_KEY);
      await client.post('send', { version: 'v3.1' }).request(email);
    } else {
      Logger.debug('Would have sent the following email')
      Logger.debug(JSON.stringify(email));
    }
  }

  protected generateHost(): string {
    if (Environment.IS_PRODUCTION) {
      return 'https://recipiece.org/';
    } else {
      return 'http://localhost:4200/';
    }
  }

  protected generateSendoff(): string {
    return 'All the best,<br/>The Recipiece Team';
  }
}
