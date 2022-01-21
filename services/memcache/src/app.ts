import cors from 'cors';
import express from 'express';
import {
  Environment,
  rcpErrorMiddleware,
  rcpInternalAuthMiddleware,
  rcpLoggerMiddleware,
  Utils,
} from 'recipiece-common';
import { memdel, memget, memhas, memset } from './operations';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/:key', async (req, res) => {
  const key = req.params.key;
  const response = await memget(key);
  if (!Utils.nou(response)) {
    res.status(200).send(response);
  } else {
    res.status(404).send();
  }
});

app.get('/has/:key', async (req, res) => {
  const hasKey = await memhas(req.params.key);
  if (hasKey) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.post('/:key', async (req, res) => {
  const key = req.params.key;
  const data = req.body;
  const ttl = data.ttl ?? Environment.MEMCACHE_EXP;
  await memset(key, data.data, ttl);
  res.status(204).send();
});

app.delete('/:key', async (req, res) => {
  await memdel(req.params.key);
  res.status(204).send();
});

app.use(rcpLoggerMiddleware);
app.use(rcpErrorMiddleware);
app.use(rcpInternalAuthMiddleware);

export const memcacheApp = app;
