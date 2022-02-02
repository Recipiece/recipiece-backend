import { Router } from 'express';
import { rcpAuthMiddleware } from 'recipiece-common';
import { deleteUserAccount, loginUser, logoutUser } from '../api/user';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', rcpAuthMiddleware(), logoutUser);
router.post('/delete-account', rcpAuthMiddleware(), deleteUserAccount);

export const userRouter = router;
