import { Email } from './email';

export class ForgotPasswordEmail extends Email {
  constructor(to: string, private readonly token: string) {
    super(to, 'Forgot Password Request');
  }

  public getContent(): string {
    const resetUrl = `${this.generateHost()}/landing/password-reset?token=${this.token}&email=${this.to}`;
    return `
We received a password reset request for this account. 
Your password reset token is
<br/><br/>
${this.token}
<br/><br/>
Alternatively, you can
<a href="${resetUrl}">click here</a> To reset your password,
or use the link below
<br/><br/>
${resetUrl}
<br/><br/>
If you did not initiate this request, please contact support immediately
by replying to this email.<br/><br/>
${this.generateSendoff()}
  `.trim();
  }
}
