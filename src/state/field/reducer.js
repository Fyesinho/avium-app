import {GET_FIELD_FAIL, GET_FIELD_INIT, GET_FIELD_SUCCESS} from "./const";
import {reducerFunctionField} from "./reducerFunction";

const initialState = {
    fieldData: {},
    fieldInit: true,
    fieldFail: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FIELD_INIT: {
            return {
                ...state,
                fieldData: {},
                fieldInit: true,
                fieldFail: false,
            }
        }
        case GET_FIELD_SUCCESS: {
            return {
                ...state,
                fieldData: reducerFunctionField(action.payload),
                fieldInit: false,
                fieldFail: false,
            }
        }
        case GET_FIELD_FAIL: {
            return {
                ...state,
                fieldData: {},
                fieldInit: false,
                fieldFail: true,
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;