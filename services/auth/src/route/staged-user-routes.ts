import { Router } from 'express';
import { migrateStagedUser } from '../api/staged-user/migrate-staged-user';
import { stageUser } from '../api/staged-user/stage-user';

export const stagedUserRouter = Router();

stagedUserRouter.post('/', stageUser);

stagedUserRouter.post('/confirm-account', migrateStagedUser);
