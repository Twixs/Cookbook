import axios from 'axios';
import { showSnackbar } from './snackbarAction';

export const MODIFY_RECIPE_PENDING = 'MODIFY_RECIPE_PENDING';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const GET_RECIPE_PENDING = 'GET_RECIPE_PENDING';
export const GET_RECIPE_ERROR = 'GET_RECIPE_ERROR';


export const recipeRequest = () => {
    return {
        type: MODIFY_RECIPE_PENDING
    }
}

export const recipeRequestSuccess = (data) => {
    return {
        type: GET_RECIPE_SUCCESS,
        payload: data
    }
}

export const recipeRequestPending = () => {
    return {
        type: GET_RECIPE_PENDING,
    }
}

export const recipeRequestError = (error) => {
    return {
        type: GET_RECIPE_ERROR,
        payload: error
    }
}

export const getRecipe = (id) => (dispatch) => {
    dispatch(recipeRequestPending());
    axios
        .get(`/api/recipes/${id}`)
        .then((res) => dispatch(recipeRequestSuccess(res.data)))
        .catch((error) => dispatch(recipeRequestError(error.message)));
}

export const addRecipe = (data) => (dispatch) => {
    dispatch(recipeRequest());
    axios
        .post('/api/recipes', data)
        .then((res) => {
            if (res.status === 200) {
                dispatch(showSnackbar({
                    show: true,
                    message: 'Your recipe has successfully been saved!',
                    status: 'success',
                }))
            }
        })
        .catch((error) => dispatch(showSnackbar({
            show: true,
            message: 'Something went wrong, please try again',
            status: 'error',
        })));
}

export const editRecipe = (data) => (dispatch) => {
    dispatch(recipeRequest());
    axios
        .put(`/api/recipes/${data.id}`, data)
        .then((res) => {
            if (res.status === 200) {
                dispatch(showSnackbar({
                    show: true,
                    message: 'The recipe has been successfully updated!',
                    status: 'success',
                }))
            }
        })
        .catch((error) => dispatch(showSnackbar({
            show: true,
            message: 'Something went wrong, please try again',
            status: 'error',
        })));
}

export const deleteRecipe = (data) => (dispatch) => {
    dispatch(recipeRequest());
    axios
        .delete(`/api/recipes/${data.id}`)
        .then((res) => {
            if (res.status === 200) {
                dispatch(showSnackbar({
                    show: true,
                    message: `The recipe "${data.name}" has been deleted`,
                    status: 'error',
                }))
            }
        })
        .catch((error) => dispatch(showSnackbar({
            show: true,
            message: 'Something went wrong, please try again',
            status: 'error',
        })));
}