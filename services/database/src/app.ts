import cors from 'cors';
import express from 'express';
import {
  deleteManyOp,
  deleteOneOp,
  findOneOp,
  findOp,
  insertManyOp,
  insertOneOp,
  updateManyOp,
  updateOneOp,
} from 'operations';
import { BadRequestError } from 'recipiece-common';
import { restoreObjectId, stripObjectId } from './utils';

const app = express();
app.use(cors());
app.use(express.json());

const VALID_OPS: { [op: string]: Function } = {
  updateMany: updateManyOp,
  deleteOne: deleteOneOp,
  deleteMany: deleteManyOp,
};

app.post('/:collection/find-one', async (req, res) => {
  const response = await findOneOp(req.params.collection, req.body.query);
  res.status(200).send(response);
});

app.post('/:collection/find', async (req, res) => {
  const page = +(req.query.page ?? '0');
  const results = findOp(req.params.collection, page, req.body.query);
  res.status(200).send(results);
});

app.post('/:collection/insert-one', async (req, res) => {
  const results = await insertOneOp(req.params.collection, req.body.data);
  res.status(200).send(results);
});

app.post('/:collection/insert-many', async (req, res) => {
  const results = await insertManyOp(req.params.collection, req.body.data);
  res.status(200).send(results);
});

app.post('/:collection/update-one', async (req, res) => {
  const results = await updateOneOp(req.params.collection, req.body.query, req.body.data);
  res.status(200).send(results);
});

app.post('/:collection/update-many', async (req, res) => {});
