import axios from 'axios';
import {LOGIN_USER_FAIL, LOGIN_USER_INIT, LOGIN_USER_SUCCESS} from "./const";
import {getUser} from "../../server/user";
import {LOADING_END, LOADING_INIT} from "../loading/const";

export const loginNoSync = (user) => {
    return async dispatch => {
        const loginSuccess = response => {
            dispatch({type: LOGIN_USER_SUCCESS, payload: response})
            // dispatch({type: LOADING_END});
        }
        const loginFail = error => {
            // dispatch({type: LOADING_END});
            dispatch({type: LOGIN_USER_FAIL, payload: error})
        }
        try {
            // const formData = new FormData();
            // formData.append('email', user.email);
            // formData.append('password', user.password);
            // const response = await axios.post(getUser, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }})
            loginSuccess(user)
            // return user;
        } catch (e) {
            loginFail(e)
        }
    }
}

export const login = ({email, password}) => {
    return async dispatch => {
        dispatch({type: LOADING_INIT});
        dispatch({type: LOGIN_USER_INIT});
        const loginSuccess = response => {
            dispatch({type: LOGIN_USER_SUCCESS, payload: response})
            dispatch({type: LOADING_END});
        }
        const loginFail = error => {
            dispatch({type: LOADING_END});
            dispatch({type: LOGIN_USER_FAIL, payload: error})
        }
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            const response = await axios.post(getUser, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            loginSuccess(response.data)
            return response.data;
        } catch (e) {
            loginFail(e)
        }
    }
}