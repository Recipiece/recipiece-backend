import cors from 'cors';
import express from 'express';
import { rcpErrorMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { converterRouter, cookbookRouter, recipeRouter } from './route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rcpLoggerMiddleware);

app.get('/health-check', (_, res) => {
  res.status(200).send('Hello from Recipiece Recipes!');
});

app.use('/recipes', recipeRouter);
app.use('/cookbooks', cookbookRouter);
app.use('/converter', converterRouter);

app.use(rcpErrorMiddleware);

export const recipeApp = app;
