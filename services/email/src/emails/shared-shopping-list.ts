import * as E from 'express';
import { BadRequestError, Utils } from 'recipiece-common';
import { sendEmail } from '../api';
import { generateHost, generateSendoff } from './utils';

export async function sendSharedShoppingListEmail(req: E.Request, res: E.Response, next: E.NextFunction) {
  const { to, data } = req.body;
  if (Utils.nou(data?.list)) {
    next(new BadRequestError('data.list', 'undefined'));
  } else if (Utils.nou(data?.owner)) {
    next(new BadRequestError('data.owner', 'undefined'));
  } else if (Utils.nou(to)) {
    next(new BadRequestError('to', 'undefined'));
  } else {
    sendEmail({
      to: to,
      subject: 'Shopping List Access Granted',
      htmlContent: genHtmlContent(data.owner, data.list),
    });
  }
}

function genHtmlContent(owner: string, list: string): string {
  const listUrl = `${generateHost()}/shopping-lists/view/${list}`;
  return `
Hello! ${owner} has shared their shopping list with you.
You may view and make changes to the list in conjunction with them now,
until they remove your access.
The shopping list is available at
<br/><br/>
${listUrl}
<br/><br/>
and is visible in the <i>Lists Shared With You<i> section of your shopping lists
on Recipiece.
<br/><br/>
${generateSendoff()}
  `.trim();
}
