import { loginUser } from 'api/user/login-user';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const loginBundle = await loginUser(username, password);
  res.status(200).send(loginBundle);
});
