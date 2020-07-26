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
import {reducerCurrentVisit, reducerFunctionVisit} from "./reducerFunction";

const initialState = {
    visitPostData: {},
    visitPostInit: true,
    visitPostFail: false,
    visitGetData: [],
    visitGetInit: true,
    visitGetFail: false,
    currentVisit: {},
    currentVisitInit: true,
    currentVisitFail: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_VISIT_INIT: {
            return {
                ...state,
                visitPostData: {},
                visitPostInit: true,
                visitPostFail: false,
            }
        }
        case POST_VISIT_SUCCESS: {
            return {
                ...state,
                visitPostData: action.payload,
                visitPostInit: false,
                visitPostFail: false,
            }
        }
        case POST_VISIT_FAIL: {
            return {
                ...state,
                visitPostData: {},
                visitPostInit: false,
                visitPostFail: true,
            }
        }
        case GET_VISIT_INIT: {
            return {
                ...state,
                visitGetData: [],
                visitGetInit: true,
                visitGetFail: false,
            }
        }
        case GET_VISIT_SUCCESS: {
            return {
                ...state,
                visitGetData: reducerFunctionVisit(action.payload),
                visitGetInit: false,
                visitGetFail: false,
            }
        }
        case GET_VISIT_FAIL: {
            return {
                ...state,
                visitGetData: [],
                visitGetInit: false,
                visitGetFail: true,
            }
        }
        case GET_CURRENT_VISIT_INIT: {
            return {
                ...state,
                currentVisit: {},
                currentVisitInit: true,
                currentVisitFail: false,
            }
        }
        case GET_CURRENT_VISIT_SUCCESS: {
            return {
                ...state,
                currentVisit: reducerCurrentVisit(action.payload),
                currentVisitInit: false,
                currentVisitFail: false,
            }
        }
        case GET_CURRENT_VISIT_FAIL: {
            return {
                ...state,
                currentVisit: [],
                currentVisitInit: false,
                currentVisitFail: true,
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;