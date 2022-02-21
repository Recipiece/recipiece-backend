import { encryptPassword } from "./encrypt-password";

export async function comparePasswords(raw: string, encrypted: string, salt: string, nonce: string): Promise<boolean> {
  const rawEncrypted = await encryptPassword(raw, salt, nonce)
  return encrypted === rawEncrypted.password;
}
