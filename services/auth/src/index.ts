import { Environment } from 'recipiece-common';
import { authApp } from './app';

authApp.listen(Environment.AUTH_SERIVCE_PORT, () => {
  console.log(`Auth listening on port ${Environment.AUTH_SERIVCE_PORT}`);
});