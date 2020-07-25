import {LOADING_END, LOADING_INIT} from "./const";

export const loadingInit = () => {
    return async dispatch => {
        dispatch({type: LOADING_INIT});
    }
}

export const loadingEnd = () => {
    return async dispatch => {
        dispatch({type: LOADING_END});
    }
}