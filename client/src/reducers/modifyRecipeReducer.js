import { MODIFY_RECIPE_PENDING, GET_RECIPE_SUCCESS, GET_RECIPE_ERROR, GET_RECIPE_PENDING } from '../actions';

const initialState = {
  recipe: {},
  pending: false,
  error: null,
};

export const modifyRecipe = (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_RECIPE_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_RECIPE_SUCCESS:
      return {
        ...state,
        pending: false,
        recipe: action.payload,
      };
    case GET_RECIPE_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_RECIPE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return initialState;
  }
};
