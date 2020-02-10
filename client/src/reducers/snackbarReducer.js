import { SHOW_SNACKBAR } from '../actions';

const initialState = {
  snackbar: {},
};

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    default:
      return state;
  }
};
