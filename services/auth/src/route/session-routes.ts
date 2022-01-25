import { Router } from 'express';
import { rcpInternalAuthMiddleware } from 'recipiece-common';
import { validateToken } from '../api/session';

const router = Router();

router.post('/validate-token', rcpInternalAuthMiddleware, validateToken);

export const sessionRouter = router;
