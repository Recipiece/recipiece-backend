import { Logger } from '@nestjs/common';
import { EnvironmentConstants } from '@recipiece/common';
import mailjet from 'node-mailjet';

export abstract class Email {
  protected constructor(protected readonly to: string, protected readonly subject: string) {}

  public abstract getContent(): string;

  public async send() {
    const supportAddress = process.env[EnvironmentConstants.variables.supportEmailAddress];

    const email = {
      Messages: [
        {
          From: {
            Email: supportAddress,
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

    if (EnvironmentConstants.values.isProduction) {
      const apiKey = process.env[EnvironmentConstants.variables.mailjetApiKey];
      const apiSecret = process.env[EnvironmentConstants.variables.mailjetSecret];
      const client = mailjet.connect(apiKey, apiSecret);
      await client.post('send', { version: 'v3.1' }).request(email);
    } else {
      Logger.debug('Would have sent the following email');
      Logger.debug(JSON.stringify(email));
    }
  }

  protected generateHost(): string {
    if (EnvironmentConstants.values.isProduction) {
      return 'https://recipiece.org/';
    } else {
      return 'http://localhost:4200/';
    }
  }

  protected generateSendoff(): string {
    return 'All the best,<br/>The Recipiece Team';
  }
}
