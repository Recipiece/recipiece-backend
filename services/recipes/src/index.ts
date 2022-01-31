import { Environment } from 'recipiece-common';
import { recipeApp } from './app';

recipeApp.listen(Environment.RECIPE_SERIVCE_PORT, () => {
  console.log(`Recipes listening on port ${Environment.RECIPE_SERIVCE_PORT}`);
});
