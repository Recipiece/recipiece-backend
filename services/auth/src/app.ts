import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { stagedUserRouter } from './route/staged-user-routes';
import { Environment } from 'recipiece-common';

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.get('/health-check', (_, res) => {
  res.status(200).send('Hello from Recipiece Auth!');
});

app.use('/staged-user', stagedUserRouter);

app.listen(Environment.AUTH_SERIVCE_PORT, () => {
  console.log(`Auth listening on port ${Environment.AUTH_SERIVCE_PORT}` );
});
