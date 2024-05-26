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
    CLEAR_ERROR

} from "../constants/requestConstant";

export const requestReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case UPDATE_REQUEST_STATUS_REQUEST:
        case GET_ALL_REQUEST_REQUEST:

            return {
                loading: true,
            }
            case UPDATE_REQUEST_STATUS_SUCCESS:
            case GET_ALL_REQUEST_SUCCESS:
                // console.log(action.payload);
                return {
                    loading: false,
                    requests: action.payload
                }
        case UPDATE_REQUEST_STATUS_FAIL:
        case GET_ALL_REQUEST_FAIL:

            return {
                loading: false,
                error: action.payload,
                requests: null,

            }
            case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
        default:
            return { ...state }
    }
}
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
            return{
                ...state,
                error:null
            }
            case CLEAR_ERROR:
            return{
                ...state,
                message:null,
            }
        default:
            return { ...state }
    }
}

export const requestedProductReducer = (state = { requestedProduct: [] }, action) => {
    switch (action.type) {
        case UPDATE_REQUESTED_PRODUCT_STATUS_REQUEST:
        case REQUESTED_PRODUCT_REQUEST:
            return {
                loading: true,
                requestedProduct: []
            }
        case UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS:
        case REQUESTED_PRODUCT_SUCCESS:
            return {
                loading: false,
                requestedProduct: action.payload,
            }
        case UPDATE_REQUESTED_PRODUCT_STATUS_FAIL:
        case REQUESTED_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
            case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
        default:
            return { ...state }
    }
}
