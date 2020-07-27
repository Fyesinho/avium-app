import {GET_LABOR_FAIL, GET_LABOR_INIT, GET_LABOR_SUCCESS} from "./const";
import {reducerFunctionLabor} from "./reducerFunction";

const initialState = {
    laborData: {},
    laborInit: true,
    laborFail: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LABOR_INIT: {
            return {
                ...state,
                laborData: {},
                laborInit: true,
                laborFail: false,
            }
        }
        case GET_LABOR_SUCCESS: {
            return {
                ...state,
                laborData: reducerFunctionLabor(action.payload),
                laborInit: false,
                laborFail: false,
            }
        }
        case GET_LABOR_FAIL: {
            return {
                ...state,
                laborData: {},
                laborInit: false,
                laborFail: true,
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;