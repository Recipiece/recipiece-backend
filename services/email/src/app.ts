import cors from 'cors';
import express from 'express';
import { rcpErrorMiddleware, rcpInternalAuthMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { sendForgotPasswordEmail, sendSharedShoppingListEmail, sendSignupEmail } from './emails';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rcpInternalAuthMiddleware);
app.use(rcpLoggerMiddleware);

app.post('/send/signup', sendSignupEmail);
app.post('/send/forgot-password', sendForgotPasswordEmail);
app.post('/send/shared-shopping-list', sendSharedShoppingListEmail);

app.use(rcpErrorMiddleware);

export const emailApp = app;
