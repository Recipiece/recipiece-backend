import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { sendEmail } from '../api';
import { generateHost, generateSendoff } from './utils';

export async function sendForgotPasswordEmail(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { to, data } = req.body;
  if (Utils.nou(data?.token)) {
    next(new BadRequestError('data.token', 'undefined'));
  } else if (Utils.nou(to)) {
    next(new BadRequestError('to', 'undefined'));
  } else {
    sendEmail({
      to: to,
      subject: 'Forgot Password Request',
      htmlContent: genHtmlContent(to, data.token),
    });
  }
}

function genHtmlContent(to: string, token: string): string {
  const resetUrl = `${generateHost()}/password-reset?token=${token}&email=${to}`;
  return `
We received a password reset request for this account. 
Your password reset token is
<br/><br/>
${token}
<br/><br/>
Alternatively, you can
<a href=\"${resetUrl}\">click here</a> To reset your password,
or use the link below
<br/><br/>
${resetUrl}
<br/><br/>
If you did not initiate this request, please contact support immediately
by replying to this email.<br/><br/>
${generateSendoff()}
  `.trim();
}
