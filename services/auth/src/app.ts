import cors from 'cors';
import express from 'express';
import { rcpErrorMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { stagedUserRouter, userRouter } from './route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rcpLoggerMiddleware);

app.get('/health-check', (_, res) => {
  res.status(200).send('Hello from Recipiece Auth!');
});

app.use('/staged-users', stagedUserRouter);
app.use('/users', userRouter);

app.use(rcpErrorMiddleware);

export const authApp = app;
