import {
    GET_ALL_REQUEST_REQUEST,
    GET_ALL_REQUEST_SUCCESS,
    GET_ALL_REQUEST_FAIL,
    GET_PRODUCT_QUANTITY_REQUEST,
    GET_PRODUCT_QUANTITY_SUCCESS,
    GET_PRODUCT_QUANTITY_FAIL,
    UPDATE_PRODUCT_QUANTITY_REQUEST,
    UPDATE_PRODUCT_QUANTITY_SUCCESS,
    UPDATE_PRODUCT_QUANTITY_FAIL,
    UPDATE_REQUEST_STATUS_REQUEST,
    UPDATE_REQUEST_STATUS_SUCCESS,
    UPDATE_REQUEST_STATUS_FAIL,
    UPDATE_REQUESTED_PRODUCT_STATUS_REQUEST,
    UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS,
    UPDATE_REQUESTED_PRODUCT_STATUS_FAIL,
    REQUESTED_PRODUCT_REQUEST,
    REQUESTED_PRODUCT_SUCCESS,
    REQUESTED_PRODUCT_FAIL,
    GET_REQUEST_BY_ID_REQUEST,
    GET_REQUEST_BY_ID_SUCCESS,
    GET_REQUEST_BY_ID_FAIL,
    CLEAR_ERROR

} from "../constants/requestConstant";

export const requestReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case UPDATE_REQUEST_STATUS_REQUEST:
        case GET_ALL_REQUEST_REQUEST:
        case UPDATE_REQUESTED_PRODUCT_STATUS_REQUEST:
        case GET_REQUEST_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_REQUEST_STATUS_SUCCESS:
        case UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS:
            // console.log(action.payload.newData[0]);
            return {
                ...state,
                loading: false,
                requests: action.payload.allRequest,
                requestData: action.payload.newData[0],
            };
        case GET_ALL_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.payload.allRequest,
            };
        case GET_REQUEST_BY_ID_SUCCESS:
            // case UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS:

            return {
                ...state,
                loading: false,
                requestData: action.payload
            }
        case UPDATE_REQUEST_STATUS_FAIL:
        case GET_ALL_REQUEST_FAIL:
        case UPDATE_REQUESTED_PRODUCT_STATUS_FAIL:
        case GET_REQUEST_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                // requests: null,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const productQuantityReducer = (state = { quantity: 0 }, action) => {
    switch (action.type) {
        case GET_PRODUCT_QUANTITY_REQUEST:
        case UPDATE_PRODUCT_QUANTITY_REQUEST:
            return {
                loading: true,
            }

        case GET_PRODUCT_QUANTITY_SUCCESS:
        case UPDATE_PRODUCT_QUANTITY_SUCCESS:
            // console.log(action.payload);
            return {
                loading: false,
                quantity: action.payload
            }
        case UPDATE_PRODUCT_QUANTITY_SUCCESS:
            // console.log(action.payload);
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case GET_PRODUCT_QUANTITY_FAIL:
        case UPDATE_PRODUCT_QUANTITY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case CLEAR_ERROR:
            return {
                ...state,
                message: null,
            }
        default:
            return { ...state }
    }
}

export const requestedProductReducer = (state = { requestedProduct: [] }, action) => {
    switch (action.type) {
        case REQUESTED_PRODUCT_REQUEST:
            return {
                loading: true,
                requestedProduct: []
            }
        case REQUESTED_PRODUCT_SUCCESS:
            return {
                loading: false,
                requestedProduct: action.payload,
            }
        case REQUESTED_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state }
    }
}


// export const currentRequestReducer = (state = { requestData: [] }, action) => {
//     switch (action.type) {
//         case GET_REQUEST_BY_ID_REQUEST:
//             // case UPDATE_REQUESTED_PRODUCT_STATUS_REQUEST:
//             return {
//                 loading: true,
//             }
//         case GET_REQUEST_BY_ID_SUCCESS:
//             // case UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS:

//             return {
//                 loading: false,
//                 requestData: action.payload
//             }
//         case GET_REQUEST_BY_ID_FAIL:
//             // case UPDATE_REQUESTED_PRODUCT_STATUS_FAIL:


//             return {
//                 loading: false,
//                 error: action.payload,

//             }
//         case CLEAR_ERROR:
//             return {
//                 ...state,
//                 error: null
//             }
//         default:
//             return { ...state }
//     }
// }