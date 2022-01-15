import * as Crypto from 'crypto';
import { SECRET_KEY } from '../secrets';

export function decrypt(value: string, nonce: string = undefined): string {
  const encrypted = Buffer.from(value, 'base64');
  const iv = Buffer.from(nonce, 'base64');
  const decipher = Crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
  const decrypted = decipher.update(encrypted);
  return Buffer.concat([decrypted, decipher.final()]).toString();
}