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
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../constants/productConstants'

export const productReducer = (state = { allProductType: [],message:'' }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_TYPE_REQUEST:
    case ADD_PRODUCT_REQUEST:
    case ADD_PRODUCT_TYPE_REQUEST:
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
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
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
