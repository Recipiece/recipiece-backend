import { convertRecipeAltitude, convertSingleIngredient, listCommonIngredients, listMeasures } from '../api/converter';
import { Router } from 'express';
import { rcpAuthMiddleware } from 'recipiece-common';

const router = Router();

router.post('/ingredient', rcpAuthMiddleware(), convertSingleIngredient);
router.post('/altitude/:recipeId', rcpAuthMiddleware(), convertRecipeAltitude);
router.get('/list/measures', rcpAuthMiddleware(), listMeasures);
router.get('/list/ingredients', rcpAuthMiddleware(), listCommonIngredients);

export const converterRouter = router;
