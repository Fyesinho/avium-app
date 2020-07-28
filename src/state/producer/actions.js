import axios from 'axios';
import {LOADING_END, LOADING_INIT} from "../loading/const";
import {GET_PRODUCER_FAIL, GET_PRODUCER_INIT, GET_PRODUCER_SUCCESS} from "./const";
import {getProducer} from "../../server/producer";
import AsyncStorage from "@react-native-community/async-storage";
import {reducerFunctionProducer} from "./reducerFunction";

export const getProducers = (token) => {
    return async dispatch => {
        dispatch({type: LOADING_INIT});
        // dispatch({type: GET_PRODUCER_INIT});
        const getProducerSuccess = response => {
            dispatch({type: GET_PRODUCER_SUCCESS, payload: response})
            // dispatch({type: LOADING_END});
        }
        const getProducerError = error => {
            // dispatch({type: LOADING_END});
            dispatch({type: GET_PRODUCER_FAIL, payload: error})
        }
        try {
            const response = await axios.get(getProducer, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            getProducerSuccess(response.data);
            const producers = reducerFunctionProducer(response.data);
            await AsyncStorage.setItem(`@producers`, JSON.stringify(producers))
        } catch (e) {
            getProducerError(e)
        }
    }
}