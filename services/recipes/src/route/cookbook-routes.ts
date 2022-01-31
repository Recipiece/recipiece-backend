import {
  createCookbook,
  deleteCookbook,
  getCookbook,
  listCookbooksForUser,
  listRecipesForCookbook,
  updateCookbook,
} from '../api/cookbook';
import { Router } from 'express';
import { rcpAuthMiddleware } from 'recipiece-common';

const router = Router();

router.post('/', rcpAuthMiddleware(), createCookbook);
router.get('/:bookId', rcpAuthMiddleware(), getCookbook);
router.delete('/:bookId', rcpAuthMiddleware(), deleteCookbook);
router.put('/:bookId', rcpAuthMiddleware(), updateCookbook);
router.get('/list/:userId', rcpAuthMiddleware(), listCookbooksForUser);
router.get('/:bookId/recipes', rcpAuthMiddleware(), listRecipesForCookbook);

export const cookbookRouter = router;
