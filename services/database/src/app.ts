import express, { Request, Response } from 'express';
import cors from 'cors';
import { deleteEntity, getCollection, saveEntity } from './operations';
import { Environment } from '@common/environment';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/:collection/save', async (request: Request, response: Response) => {
  const savedEntity = await saveEntity(request.params.collection, request.body);
  response.send(savedEntity);
});

app.delete('/:collection/delete', async (request: Request, response: Response) => {
  await deleteEntity(request.params.collection, request.body.id);
  response.status(204).send();
});

app.post('/:collection/query', async (request: Request, response: Response) => {
  const collection = await getCollection(request.params.collection);
  const page = Number.parseInt(<string>request.query.page || '0');
  const query = request.body;
  const cursor = collection
    .find(query)
    .skip(page * Environment.DB_PAGE_SIZE)
    .limit(Environment.DB_PAGE_SIZE);
  response.send({
    results: cursor.toArray(),
  });
});

app.listen(Environment.DB_SERIVCE_PORT, '0.0.0.0', () => {
  console.log('Listening on port 7801');
});

