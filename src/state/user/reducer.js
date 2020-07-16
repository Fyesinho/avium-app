import {LOGIN_USER_FAIL, LOGIN_USER_INIT, LOGIN_USER_SUCCESS} from "./const";

const initialState = {
    userData: {},
    userInit: true,
    userFail: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_INIT: {
            return {
                ...state,
                userData: {},
                userInit: true,
                userFail: false,
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                userData: action.payload,
                userInit: false,
                userFail: false,
            }
        }
        case LOGIN_USER_FAIL: {
            return {
                ...state,
                userData: {},
                userInit: false,
                userFail: true,
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;