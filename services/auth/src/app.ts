import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { Environment } from '@common/environment';
import { stagedUserRouter } from './route/staged-user';

const app = express();
app.use(cors);
app.use(bodyparser);

app.get('/health-check', (_, res) => {
  res.status(200).send('Hello from Recipiece Auth!');
});

app.use('/staged-user', stagedUserRouter);

app.listen(Environment.AUTH_SERIVCE_PORT, () => {
  console.log('Auth is ready.');
});
