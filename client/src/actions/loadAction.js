import axios from 'axios';

export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_PENDING = 'LOAD_RECIPES_PENDING';
export const LOAD_RECIPES_ERROR = 'LOAD_RECIPES_ERROR';

export const loadRecipesRequest = () => {
  return {
    type: LOAD_RECIPES_PENDING,
  };
};

export const loadRecipesSuccess = (recipes) => {
  return {
    type: LOAD_RECIPES_SUCCESS,
    payload: recipes,
  };
};

export const loadRecipesError = (error) => {
  return {
    type: LOAD_RECIPES_ERROR,
    payload: error,
  };
};

export const fetchRecipes = () => (dispatch) => {
  dispatch(loadRecipesRequest());
  axios
    .get('/api/recipes')
    .then((res) => dispatch(loadRecipesSuccess(res.data)))
    .catch((error) => dispatch(loadRecipesError(error.message)));
};
