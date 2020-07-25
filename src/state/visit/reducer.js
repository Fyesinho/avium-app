import {POST_VISIT_FAIL, POST_VISIT_INIT, POST_VISIT_SUCCESS} from "./const";

const initialState = {
    visitPostData: {},
    visitPostInit: true,
    visitPostFail: false,
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
        default: {
            return state;
        }
    }
}
export default reducer;