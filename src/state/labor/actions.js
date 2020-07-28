import axios from 'axios';
import {LOADING_END, LOADING_INIT} from "../loading/const";
import {GET_LABOR_FAIL, GET_LABOR_INIT, GET_LABOR_SUCCESS} from "./const";
import {getLabor} from "../../server/labor";
import {reducerFunctionProducer} from "../producer/reducerFunction";
import AsyncStorage from "@react-native-community/async-storage";
import {reducerFunctionLabor} from "./reducerFunction";

export const getLabors = (token) => {
    return async dispatch => {
        // dispatch({type: LOADING_INIT});
        dispatch({type: GET_LABOR_INIT});
        const actionSuccess = response => {
            dispatch({type: GET_LABOR_SUCCESS, payload: response})
            // dispatch({type: LOADING_END});
        }
        const actionError = error => {
            // dispatch({type: LOADING_END});
            dispatch({type: GET_LABOR_FAIL, payload: error.response})
        }
        try {
            const response = await axios.get(getLabor, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            actionSuccess(response.data)
            const labors = reducerFunctionLabor(response.data);
            await AsyncStorage.setItem(`@labors`, JSON.stringify(labors))
        } catch (e) {
            actionError(e)
        }
    }
}