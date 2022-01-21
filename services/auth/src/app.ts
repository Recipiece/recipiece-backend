import cors from 'cors';
import express from 'express';
import { rcpErrorMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { stagedUserRouter } from './route/staged-user-routes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health-check', (_, res) => {
  res.status(200).send('Hello from Recipiece Auth!');
});

app.use('/staged-users', stagedUserRouter);

app.use(rcpLoggerMiddleware);
app.use(rcpErrorMiddleware);

export const authApp = app;
