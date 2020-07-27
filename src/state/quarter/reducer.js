import {GET_QUARTER_FAIL, GET_QUARTER_INIT, GET_QUARTER_SUCCESS} from "./const";
import {reducerFunctionQuarter} from "./reducerFunction";

const initialState = {
    quarterData: {},
    quarterInit: true,
    quarterFail: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUARTER_INIT: {
            return {
                ...state,
                quarterData: {},
                quarterInit: true,
                quarterFail: false,
            }
        }
        case GET_QUARTER_SUCCESS: {
            return {
                ...state,
                quarterData: reducerFunctionQuarter(action.payload),
                quarterInit: false,
                quarterFail: false,
            }
        }
        case GET_QUARTER_FAIL: {
            return {
                ...state,
                quarterData: {},
                quarterInit: false,
                quarterFail: true,
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;