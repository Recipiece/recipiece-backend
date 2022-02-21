import { Environment } from '@recipiece/common';
import * as Crypto from 'crypto';

export function decrypt(value: string, nonce: string = undefined): string {
  const encrypted = Buffer.from(value, 'base64');
  const iv = Buffer.from(nonce, 'base64');
  const decipher = Crypto.createDecipheriv('aes-256-cbc', Buffer.from(Environment.APP_SECRET), iv);
  const decrypted = decipher.update(encrypted);
  return Buffer.concat([decrypted, decipher.final()]).toString();
}