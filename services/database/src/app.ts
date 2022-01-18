import cors from 'cors';
import express from 'express';
import { deleteManyOp, deleteOneOp, findOneOp, findOp, insertManyOp, insertOneOp, updateOneOp } from './operations';
import { Environment, rcpErrorMiddleware, rcpInternalAuthMiddleware, rcpLoggerMiddleware } from 'recipiece-common';

const app = express();
app.use(cors());
app.use(express.json());

app.use('*', rcpInternalAuthMiddleware);
app.use('*', rcpErrorMiddleware);
app.use('*', rcpLoggerMiddleware);

app.post('/:collection/delete-one', async (req, res) => {
  const response = await deleteOneOp(req.params.collection, req.body.query);
  res.status(200).send(response);
});

app.post('/:collection/delete-many', async (req, res) => {
  const response = await deleteManyOp(req.params.collection, req.body.query);
  res.status(200).send(response);
});

app.post('/:collection/find-one', async (req, res) => {
  const response = await findOneOp(req.params.collection, req.body.query);
  res.status(200).send(response);
});

app.post('/:collection/find', async (req, res) => {
  const page = req.query?.page as string | undefined;
  const results = findOp(req.params.collection, req.body.query, page);
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

app.post('/:collection/update-many', async (req, res) => {
  res.status(501).send('');
});

app.listen(Environment.DB_SERIVCE_PORT, () => {
  console.log(`Database is listening on port ${Environment.DB_SERIVCE_PORT}`);
});
