import { getUserById } from 'api/user/get-by-id';
import { Router } from 'express';
import { ForbiddenError, Session } from 'recipiece-common';

const sessionRoute = Router();

sessionRoute.post('/validate-token', async (req, res) => {
  const token = req.body.token;
  const permissions = req.body.permissions;
  try {
    const session = Session.deserialize(token);
    const user = await getUserById(session.owner);
    res.status(200).send(user.asModel());
  } catch {
    throw new ForbiddenError();
  }
});
