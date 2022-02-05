import { Router } from 'express';
import { rcpAuthMiddleware, dbConnectMiddleware } from 'recipiece-common';
import { deleteUserAccount, loginUser, logoutUser } from '../api/user';

const router = Router();

router.use(dbConnectMiddleware);
router.post('/login', loginUser);
router.post('/logout', rcpAuthMiddleware(), logoutUser);
router.post('/delete-account', rcpAuthMiddleware(), deleteUserAccount);

export const userRouter = router;
