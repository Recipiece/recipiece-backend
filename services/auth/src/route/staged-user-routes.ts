import { Router } from 'express';
import { dbConnectMiddleware } from 'recipiece-common';
import { migrateStagedUser } from '../api/staged-user/migrate-staged-user';
import { stageUser } from '../api/staged-user/stage-user';

const router = Router();

router.use(dbConnectMiddleware);
router.post('/stage', stageUser);
router.post('/confirm', migrateStagedUser);

export const stagedUserRouter = router;
