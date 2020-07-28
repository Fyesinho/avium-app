import axios from 'axios';
import {LOADING_END, LOADING_INIT} from "../loading/const";
import {GET_FIELD_FAIL, GET_FIELD_INIT, GET_FIELD_SUCCESS} from "./const";
import {getField} from "../../server/field";
import {reducerFunctionProducer} from "../producer/reducerFunction";
import AsyncStorage from "@react-native-community/async-storage";
import {reducerFunctionField} from "./reducerFunction";

export const getFields = (token) => {
    return async dispatch => {
        // dispatch({type: LOADING_INIT});
        dispatch({type: GET_FIELD_INIT});
        const actionSuccess = response => {
            dispatch({type: GET_FIELD_SUCCESS, payload: response})
            // dispatch({type: LOADING_END});
        }
        const actionError = error => {
            // dispatch({type: LOADING_END});
            dispatch({type: GET_FIELD_FAIL, payload: error.response})
        }
        try {
            const response = await axios.get(getField, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            actionSuccess(response.data)
            const fields = reducerFunctionField(response.data);
            await AsyncStorage.setItem(`@fields`, JSON.stringify(fields))
        } catch (e) {
            actionError(e)
        }
    }
}