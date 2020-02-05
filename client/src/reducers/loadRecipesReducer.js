import { LOAD_RECIPES_SUCCESS, LOAD_RECIPES_PENDING, LOAD_RECIPES_ERROR } from '../actions';

const initialState = {
    recipes: [],
    pending: false,
    error: null
}

export const loadRecipes = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RECIPES_SUCCESS:
            return {
                ...state,
                pending: false,
                recipes: action.payload
            }
        case LOAD_RECIPES_PENDING:
            return {
                ...state,
                pending: true
            }
        case LOAD_RECIPES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return initialState
    };
}