import cors from 'cors';
import express from 'express';
import { rcpErrorMiddleware, rcpInternalAuthMiddleware, rcpLoggerMiddleware } from 'recipiece-common';
import { rcpMongoErrorHandler } from './middleware';
import {
  deleteManyOp,
  deleteOneOp,
  findOneOp,
  findOp,
  insertManyOp,
  insertOneOp,
  updateManyOp,
  updateOneOp
} from './operations';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rcpInternalAuthMiddleware);
app.use(rcpLoggerMiddleware);

app.post('/:collection/delete-one', deleteOneOp);
app.post('/:collection/delete-many', deleteManyOp);
app.post('/:collection/find-one', findOneOp);
app.post('/:collection/find', findOp);
app.post('/:collection/insert-one', insertOneOp);
app.post('/:collection/insert-many', insertManyOp);
app.post('/:collection/update-one', updateOneOp);
app.post('/:collection/update-many', updateManyOp);

app.use(rcpMongoErrorHandler);
app.use(rcpErrorMiddleware);

export const databaseApp = app;
