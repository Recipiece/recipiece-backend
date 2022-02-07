import { Router } from 'express';
import { rcpAuthMiddleware, dbConnectMiddleware } from 'recipiece-common';
import { requestForgotPasswordToken, resetForgottenPassword, resetKnownPassword } from '../api/password';
import { deleteUserAccount, loginUser, logoutUser } from '../api/user';

const router = Router();

router.use(dbConnectMiddleware);
router.post('/login', loginUser);
router.post('/logout', rcpAuthMiddleware(), logoutUser);
router.post('/delete-account', rcpAuthMiddleware(), deleteUserAccount);

router.post('/forgot-password/request', requestForgotPasswordToken);
router.post('/forgot-password/reset', resetForgottenPassword);
router.post('/password/reset', rcpAuthMiddleware(), resetKnownPassword);

export const userRouter = router;
