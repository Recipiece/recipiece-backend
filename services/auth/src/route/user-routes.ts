import { Router } from 'express';
import { rcpAuthMiddleware } from 'recipiece-common';
import { loginUser, logoutUser } from '../api/user';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', rcpAuthMiddleware(), logoutUser);

export const userRouter = router;
