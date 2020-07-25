import {LOADING_INIT, LOADING_END} from "./const";

const initialState = {
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_INIT: {
            return {
                ...state,
                loading: true
            }
        }
        case LOADING_END: {
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;