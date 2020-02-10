import { combineReducers } from 'redux';
import { modifyRecipe } from './modifyRecipeReducer';
import { snackbarReducer } from './snackbarReducer';
import { loadRecipes } from './loadRecipesReducer';

export const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  recipes: loadRecipes,
  recipe: modifyRecipe,
});
