import { createRecipe, deleteRecipe, getRecipe, listRecipesForUser, updateRecipe } from '../api/recipe';
import { Router } from 'express';
import { dbConnectMiddleware, rcpAuthMiddleware } from 'recipiece-common';

const router = Router();

router.use(dbConnectMiddleware);

router.post('/', rcpAuthMiddleware(), createRecipe);
router.put('/:recipeId', rcpAuthMiddleware(), updateRecipe);
router.delete('/:recipeId', rcpAuthMiddleware(), deleteRecipe);
router.get('/:recipeId', getRecipe);
router.get('/list/:userId', rcpAuthMiddleware(), listRecipesForUser);

export const recipeRouter = router;
