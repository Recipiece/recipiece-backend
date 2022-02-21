import { Email } from './email';

export class SignupEmail extends Email {
  constructor(to: string, private readonly token: string) {
    super(to, 'Confirm Account Creation');
  }

  public getContent(): string {
    const confirmUrl = `${this.generateHost()}/confirm-account?token=${this.token}`;
    return `
Welcome to Recipiece! We're excited to have you using our application,
but first we need you to enter the following token on the confirm account page:
<br/><br/>
${this.token}
<br/><br/>
Alternatively, you can <a href="${confirmUrl}">click here</a> or go to the following
URL in your browser to confirm your account.
<br/><br/>
${confirmUrl}
<br/><br/>
${this.generateSendoff()}
  `.trim();
  }
}
