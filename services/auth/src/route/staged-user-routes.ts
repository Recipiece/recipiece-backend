import { migrateStagedUser } from '../api/staged-user/migrate-staged-user';
import { Router, Request, Response } from 'express';
import { stageUser } from '../api/staged-user/stage-user';

export const stagedUserRouter = Router();

stagedUserRouter.post('/', async (request: Request, response: Response) => {
  const stagedUser = await stageUser(request.body.username, request.body.password);
  response.status(201).send(stagedUser.asModel());
});

stagedUserRouter.post('/confirm-account/:token', async (req, res) => {
  await migrateStagedUser(req.params.token);
  res.status(204).send();
});
