import { Environment } from 'recipiece-common';
import { databaseApp } from './app';

databaseApp.listen(Environment.DB_SERIVCE_PORT, () => {
  console.log(`Database is listening on port ${Environment.DB_SERIVCE_PORT}`);
});
