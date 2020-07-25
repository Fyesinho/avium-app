import {GET_PRODUCER_FAIL, GET_PRODUCER_INIT, GET_PRODUCER_SUCCESS} from "./const";
import {reducerFunctionProducer} from "./reducerFunction";

const initialState = {
    producersData: {},
    producersInit: true,
    producersFail: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCER_INIT: {
            return {
                ...state,
                producersData: {},
                producersInit: true,
                producersFail: false,
            }
        }
        case GET_PRODUCER_SUCCESS: {
            return {
                ...state,
                producersData: reducerFunctionProducer(action.payload),
                producersInit: false,
                producersFail: false,
            }
        }
        case GET_PRODUCER_FAIL: {
            return {
                ...state,
                producersData: {},
                producersInit: false,
                producersFail: true,
            }
        }
        default: {
            return state;
        }
    }
}
export default reducer;