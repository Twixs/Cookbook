export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

export const showSnackbar = (data) => {
    return {
        type: SHOW_SNACKBAR,
        payload: data
    }
}