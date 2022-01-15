import { describe } from 'mocha';
import { encrypt } from '../src/encrypt/encrypt';
import { decrypt } from '../src/encrypt/decrypt';
import { encryptPassword } from '../src/encrypt/encrypt-password';
import { comparePasswords } from '../src/encrypt/compare-passwords';
import expect from 'expect';
import { randomBytes } from 'crypto';

describe('Encryption', () => {
  it('Should be able to encrypt values', () => {
    const valueToEncrypt = 'test string';
    const encrypted = encrypt(valueToEncrypt);
    expect(encrypted.encrypted).toBeTruthy();
    expect(encrypted.nonce).toBeTruthy();
  });

  it('Should be able to decrypt values', () => {
    const valueToEncrypt = 'test string';
    const encrypted = encrypt(valueToEncrypt);
    const decrypted = decrypt(encrypted.encrypted, encrypted.nonce);
    expect(decrypted).toEqual(valueToEncrypt);
  });
});

describe('Password Encryption', () => {
  it('Should be able to encrypt a password with no salt and nonce', async () => {
    const password = 'h3110';
    const encryptedPassword = await encryptPassword(password);
    expect(encryptedPassword.nonce).toBeTruthy();
    expect(encryptedPassword.password).toBeTruthy();
    expect(encryptedPassword.password).not.toEqual(password);
    expect(encryptedPassword.salt).toBeTruthy();
  });

  it('Should be able to encrypt a password given a salt and a nonce', async () => {
    const password = 'h3110';
    const salt = randomBytes(128).toString('base64');
    const nonce = randomBytes(16).toString('base64');
    const encryptedPassword = await encryptPassword(password, salt, nonce);
    expect(encryptedPassword.nonce).toBeTruthy();
    expect(encryptedPassword.password).toBeTruthy();
    expect(encryptedPassword.password).not.toEqual(password);
    expect(encryptedPassword.salt).toBeTruthy();
  });

  it('Should be able to detect a non-matching password', async () => {
    const password = 'h3110';
    const badPassword = 'h311o';

    const salt = randomBytes(128).toString('base64');
    const nonce = randomBytes(16).toString('base64');

    const encryptedPassword = await encryptPassword(password, salt, nonce);

    const areMatching = await comparePasswords(badPassword, encryptedPassword.password, salt, nonce);
    expect(areMatching).toBeFalsy();
  });

  it('Should be able to detect matching passwords', async () => {
    const password = 'h3110';

    const salt = randomBytes(128).toString('base64');
    const nonce = randomBytes(16).toString('base64');

    const encryptedPassword = await encryptPassword(password, salt, nonce);

    const areMatching = await comparePasswords(password, encryptedPassword.password, salt, nonce);
    expect(areMatching).toBeTruthy();
  });
});
