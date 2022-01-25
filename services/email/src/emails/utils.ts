import { Environment } from 'recipiece-common';

export function generateHost(): string {
  if (Environment.IS_PRODUCTION) {
    return 'https://recipiece.org/#';
  } else {
    return 'http://localhost:4200/#';
  }
}

export function generateSendoff(): string {
  return 'All the best,<br/>The Recipiece Team';
}
