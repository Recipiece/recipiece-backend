import { Environment } from '../environment';

export function getAuthHeader() {
  return {
    authorization: `Bearer ${Environment.INTERNAL_USER_TOKEN}`,
  };
}
