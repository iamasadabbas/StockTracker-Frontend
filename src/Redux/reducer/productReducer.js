import {
    GET_ALL_PRODUCT_TYPE_REQUEST,
    GET_ALL_PRODUCT_TYPE_SUCCESS,
    GET_ALL_PRODUCT_TYPE_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_TYPE_REQUEST,
    ADD_PRODUCT_TYPE_SUCCESS,
    ADD_PRODUCT_TYPE_FAIL,
    GET_ALL_PRODUCT_REQUEST,
    GET_ALL_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_FAIL,
    GET_ALL_PRODUCT_FROM_LOCATION_REQUEST,
    GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS,
    GET_ALL_PRODUCT_FROM_LOCATION_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../constants/productConstants'

export const productReducer = (state = { allProductType: [],message:'',allProduct:[] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_TYPE_REQUEST:
    case ADD_PRODUCT_REQUEST:
    case ADD_PRODUCT_TYPE_REQUEST:
    case GET_ALL_PRODUCT_FROM_LOCATION_REQUEST:
    case GET_ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        allProductType: action.payload,
      };
    case GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS:
    case GET_ALL_PRODUCT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        allProduct:action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      console.log(action.payload.message);
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        allProduct:action.payload.allProduct
      };
    case ADD_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case GET_ALL_PRODUCT_TYPE_FAIL:
    case ADD_PRODUCT_FAIL:
    case ADD_PRODUCT_TYPE_FAIL:
    case GET_ALL_PRODUCT_FROM_LOCATION_FAIL:
    case GET_ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message:null,
      };
    default:
      return state;
  }
};
