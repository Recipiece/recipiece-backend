import { Router } from 'express';
import { migrateStagedUser } from '../api/staged-user/migrate-staged-user';
import { stageUser } from '../api/staged-user/stage-user';

const router = Router();

router.post('/', stageUser);
router.post('/confirm-account', migrateStagedUser);

export const stagedUserRouter = router;
