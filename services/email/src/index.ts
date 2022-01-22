import { Environment } from 'recipiece-common';
import { emailApp } from './app';

emailApp.listen(Environment.EMAIL_SERVICE_PORT, () => {
  console.log(`Email is listening on port ${Environment.EMAIL_SERVICE_PORT}`);
});
