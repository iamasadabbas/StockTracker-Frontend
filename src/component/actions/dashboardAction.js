import {
    GET_PRODUCT_COUNT_REQUEST,
    GET_PRODUCT_COUNT_SUCCESS,
    GET_PRODUCT_COUNT_FAIL,
    GET_WAITING_REQUEST_COUNT_REQUEST,
    GET_WAITING_REQUEST_COUNT_SUCCESS,
    GET_WAITING_REQUEST_COUNT_FAIL,
    GET_7DAYS_PRODUCT_REQUEST_REQUEST,
    GET_7DAYS_PRODUCT_REQUEST_SUCCESS,
    GET_7DAYS_PRODUCT_REQUEST_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../Redux/constants/dashboardConstants'
import axiosInstance from '../axiosInstance/axiosInstance';
export const getProductCount = () => async (dispatch) => {
  // console.log('enter the get');
    try {
      dispatch({ type: GET_PRODUCT_COUNT_REQUEST });
  
      const response = await axiosInstance.get(`/productLocation/getTotalProductCount`);
      console.log(response.data);
      dispatch({ type: GET_PRODUCT_COUNT_SUCCESS, payload: response.data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: GET_PRODUCT_COUNT_FAIL, payload: error.response.data.message });
    }
  };
export const getWaitingProductRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_WAITING_REQUEST_COUNT_REQUEST });
  
      const response = await axiosInstance.get(`/request/getWaitingProductRequest`);
      // console.log(response.data);
      dispatch({ type: GET_WAITING_REQUEST_COUNT_SUCCESS, payload: response.data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: GET_WAITING_REQUEST_COUNT_FAIL, payload: error.response.data.message });
    }
  };
  
export const get7DaysRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_7DAYS_PRODUCT_REQUEST_REQUEST });
  
      const response = await axiosInstance.get(`/request/getLast7daysProductRequest`);
      // console.log(response.data);
      dispatch({ type: GET_7DAYS_PRODUCT_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: GET_7DAYS_PRODUCT_REQUEST_FAIL, payload: error.response.data.message });
    }
  };
  
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};