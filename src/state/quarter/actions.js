import axios from 'axios';
import {LOADING_END, LOADING_INIT} from "../loading/const";
import {GET_QUARTER_FAIL, GET_QUARTER_INIT, GET_QUARTER_SUCCESS} from "./const";
import {getQuarter} from "../../server/quarter";

export const getQuarters = (token) => {
    return async dispatch => {
        // dispatch({type: LOADING_INIT});
        dispatch({type: GET_QUARTER_INIT});
        const actionSuccess = response => {
            dispatch({type: GET_QUARTER_SUCCESS, payload: response})
            dispatch({type: LOADING_END});
        }
        const actionError = error => {
            dispatch({type: LOADING_END});
            dispatch({type: GET_QUARTER_FAIL, payload: error.response})
        }
        try {
            const response = await axios.get(getQuarter, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            actionSuccess(response.data)
            return response.data;
        } catch (e) {
            actionError(e)
        }
    }
}