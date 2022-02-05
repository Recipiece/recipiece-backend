import { Router } from 'express';
import { dbConnectMiddleware, rcpAuthMiddleware } from 'recipiece-common';
import { convertRecipeAltitude, convertSingleIngredient, listCommonIngredients, listMeasures } from '../api/converter';

const router = Router();

router.use(dbConnectMiddleware);

router.post('/ingredient', rcpAuthMiddleware(), convertSingleIngredient);
router.post('/altitude/:recipeId', rcpAuthMiddleware(), convertRecipeAltitude);
router.get('/list/measures', rcpAuthMiddleware(), listMeasures);
router.get('/list/ingredients', rcpAuthMiddleware(), listCommonIngredients);

export const converterRouter = router;
