import axios from 'axios';
import store from "../store";
import moment from 'moment';
import {
    GET_CURRENT_VISIT_FAIL,
    GET_CURRENT_VISIT_INIT, GET_CURRENT_VISIT_SUCCESS,
    GET_VISIT_FAIL,
    GET_VISIT_INIT,
    GET_VISIT_SUCCESS,
    POST_VISIT_FAIL,
    POST_VISIT_INIT,
    POST_VISIT_SUCCESS
} from "./const";
import {LOADING_END, LOADING_INIT} from "../loading/const";
import {visit} from "../../server/visit";

export const getVisit = id => {
    const token = store.getState().user.userData.token;
    return async dispatch => {
        dispatch({type: LOADING_INIT});
        dispatch({type: GET_CURRENT_VISIT_INIT});
        const actionSuccess = response => {
            dispatch({type: GET_CURRENT_VISIT_SUCCESS, payload: response})
            dispatch({type: LOADING_END});
        }
        const actionFail = error => {
            dispatch({type: GET_CURRENT_VISIT_FAIL, payload: error})
            dispatch({type: LOADING_END});
        }
        try {
            const response = await axios.get(`${visit}/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            actionSuccess(response.data)
            return response.data;
        } catch (e) {
            actionFail(e.response)
        }
    }
}

export const getVisits = () => {
    const token = store.getState().user.userData.token;
    return async dispatch => {
        dispatch({type: LOADING_INIT});
        dispatch({type: GET_VISIT_INIT});
        const actionSuccess = response => {
            dispatch({type: GET_VISIT_SUCCESS, payload: response})
            dispatch({type: LOADING_END});
        }
        const actionFail = error => {
            dispatch({type: GET_VISIT_FAIL, payload: error})
            dispatch({type: LOADING_END});
        }
        try {
            const response = await axios.get(visit, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            actionSuccess(response.data)
            return response.data;
        } catch (e) {
            actionFail(e.response)
        }
    }
}

export const postVisit = (payload) => {
    const token = store.getState().user.userData.token;
    return async dispatch => {
        dispatch({type: LOADING_INIT});
        dispatch({type: POST_VISIT_INIT});
        const actionSuccess = response => {
            dispatch({type: POST_VISIT_SUCCESS, payload: response})
            dispatch({type: LOADING_END});
        }
        const actionFail = error => {
            dispatch({type: POST_VISIT_FAIL, payload: error})
            dispatch({type: LOADING_END});
        }
        try {
            const formData = new FormData();
            const {producer, field, quarter, labors, id} = payload;
            formData.append("producer_id", producer.value);
            formData.append("field_id", field.value);
            formData.append("quarter_id", quarter.value);
            const time = moment(id).format("YYYY-MM-DD hh:mm:ss");
            formData.append("created_at", time);
            labors && labors.map((labor, index) => {
                const photo = {
                    uri: labor.image,
                    type: 'image/jpeg',
                    name: `labor_${time}_${index}.jpg`,
                };
                formData.append(`labors[${index}][comment]`, 'labor.comment');
                formData.append(`labors[${index}][image]`, photo);
                formData.append(`labors[${index}][labor_id]`, '1');
            })
            const response = await axios.post(visit, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    'Authorization': `Bearer ${token}`
                }
            })
            actionSuccess(response.data)
            return response.data;
        } catch (e) {
            actionFail(e.response)
        }
    }
}