import { getUserById } from 'api/user/get-by-id';
import { Router } from 'express';
import { ForbiddenError, Session } from 'recipiece-common';

const sessionRoute = Router();

sessionRoute.post('/validate-token', async (req, res, next) => {
  const token = req.body.token;
  try {
    const session = Session.deserialize(token);
    const user = await getUserById(session.owner);
    res.status(200).send(user.asModel());
  } catch {
    next(new ForbiddenError());
  }
});
