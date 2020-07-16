import axios from 'axios';
import {LOGIN_USER_FAIL, LOGIN_USER_INIT, LOGIN_USER_SUCCESS} from "./const";
import {getUser} from "../../server/user";


export const login = payload => {
    console.log(payload)
    return async dispatch => {
        dispatch({type: LOGIN_USER_INIT});
        const loginSuccess = response => {
            dispatch({type: LOGIN_USER_SUCCESS, payload: response})
        }
        const loginFail = error => {
            dispatch({type: LOGIN_USER_FAIL, payload: error})
        }
        try {
            const response = await axios.get(getUser);
            loginSuccess(response.data)
        } catch (e) {
            loginFail(e)
        }
    }
}