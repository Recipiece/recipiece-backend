import cors from 'cors';
import express from 'express';
import { Environment, rcpErrorMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { stagedUserRouter } from './route/staged-user-routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('*', rcpErrorMiddleware);
app.use('*', rcpLoggerMiddleware);

app.get('/health-check', (_, res) => {
  res.status(200).send('Hello from Recipiece Auth!');
});

app.use('/staged-user', stagedUserRouter);

app.listen(Environment.AUTH_SERIVCE_PORT, () => {
  console.log(`Auth listening on port ${Environment.AUTH_SERIVCE_PORT}` );
});
