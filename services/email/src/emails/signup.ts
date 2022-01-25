import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { sendEmail } from '../api';
import { generateHost, generateSendoff } from './utils';

export async function sendSignupEmail(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { to, data } = req.body;
  if (Utils.nou(data?.token)) {
    next(new BadRequestError('data.token', 'undefined'));
  } else if (Utils.nou(to)) {
    next(new BadRequestError('to', 'undefined'));
  } else {
    sendEmail({
      to: to,
      subject: 'Confirm Account Creation',
      htmlContent: genHtmlContent(data.token),
    });
  }
}

function genHtmlContent(token: string): string {
  const confirmUrl = `${generateHost()}/confirm-account?token=${token}`;
  return `
Welcome to Recipiece! We\'re excited to have you using our application,
but first we need you to enter the following token on the confirm account page:
<br/><br/>
${token}
<br/><br/>
Alternatively, you can <a href=\"${confirmUrl}\">click here</a> or go to the following
URL in your browser to confirm your account.
<br/><br/>
{confirmUrl}
<br/><br/>
${generateSendoff()}
  `.trim();
}
