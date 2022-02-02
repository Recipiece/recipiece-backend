import * as Crypto from 'crypto';
import { encrypt } from './encrypt';

export interface EncryptedPassword {
  password: string;
  salt: string;
  nonce: string;
}

export function encryptPassword(raw: string, salt?: string, nonce?: string): Promise<EncryptedPassword> {
  const saltBuffer = salt ? Buffer.from(salt, 'base64') : Crypto.randomBytes(128);
  return new Promise((resolve, reject) => {
    Crypto.pbkdf2(Buffer.from(raw), saltBuffer, 100, 64, 'sha512', (err, derived) => {
      if(err) {
        reject(err);
      } else {
        const encrypted = encrypt(derived.toString('base64'), nonce);
        resolve({
          password: encrypted.encrypted,
          salt: saltBuffer.toString('base64'),
          nonce: encrypted.nonce,
        })
      }
    });
  });
}
