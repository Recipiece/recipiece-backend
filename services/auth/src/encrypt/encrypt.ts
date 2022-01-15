import * as Crypto from 'crypto';
import { SECRET_KEY } from '../secrets';

export interface EncryptedBundle {
  encrypted: string;
  nonce: string;
}

export function encrypt(value: string, nonce: string = undefined): EncryptedBundle {
  const iv = nonce ? Buffer.from(nonce, 'base64') : Crypto.randomBytes(16);
  const cipher = Crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { encrypted: encrypted.toString('base64'), nonce: iv.toString('base64') };
}
