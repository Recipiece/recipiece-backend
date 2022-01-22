import cors from 'cors';
import express from 'express';
import { rcpErrorMiddleware, rcpInternalAuthMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { sendEmail } from './operations';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rcpInternalAuthMiddleware);
app.use(rcpLoggerMiddleware);

app.post('/send', sendEmail);

app.use(rcpErrorMiddleware);

export const emailApp = app;
