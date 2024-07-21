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
    GET_TOTAL_USER_COUNT_REQUEST,
    GET_TOTAL_USER_COUNT_SUCCESS,
    GET_TOTAL_USER_COUNT_FAIL,
    GET_TOTAL_ACTIVE_USER_COUNT_REQUEST,
    GET_TOTAL_ACTIVE_USER_COUNT_SUCCESS,
    GET_TOTAL_ACTIVE_USER_COUNT_FAIL,
    GET_TOTAL_ROLE_COUNT_REQUEST,
    GET_TOTAL_ROLE_COUNT_SUCCESS,
    GET_TOTAL_ROLE_COUNT_FAIL,
    GET_USER_APPROVAL_REQUEST_REQUEST,
    GET_USER_APPROVAL_REQUEST_SUCCESS,
    GET_USER_APPROVAL_REQUEST_FAIL,
    GET_7DAYS_USER_APPROVAL_REQUEST,
    GET_7DAYS_USER_APPROVAL_SUCCESS,
    GET_7DAYS_USER_APPROVAL_FAIL,
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
      console.log(error);
      dispatch({ type: GET_PRODUCT_COUNT_FAIL, payload: error.message });
    }
  };
export const getWaitingProductRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_WAITING_REQUEST_COUNT_REQUEST });
  
      const response = await axiosInstance.get(`/request/getWaitingProductRequest`);
      // console.log(response.data);
      dispatch({ type: GET_WAITING_REQUEST_COUNT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_WAITING_REQUEST_COUNT_FAIL, payload: error.message });
    }
  };
  
export const get7DaysRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_7DAYS_PRODUCT_REQUEST_REQUEST });
  
      const response = await axiosInstance.get(`/request/getLast7daysProductRequest`);
      // console.log(response.data);
      dispatch({ type: GET_7DAYS_PRODUCT_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_7DAYS_PRODUCT_REQUEST_FAIL, payload: error.message });
    }
  };
export const getTotalUserCount = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TOTAL_USER_COUNT_REQUEST });
  
      const response = await axiosInstance.get(`/user/getTotalUserCount`);
      // console.log(response.data.totalUser);
      dispatch({ type: GET_TOTAL_USER_COUNT_SUCCESS, payload: response.data.totalUser });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_TOTAL_USER_COUNT_FAIL, payload: error.message });
    }
  };
export const getTotalActiveUserCount = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TOTAL_ACTIVE_USER_COUNT_REQUEST });
  
      const response = await axiosInstance.get(`/user/getTotalActiveUserCount`);
      // console.log(response.data.totalActiveUser);
      dispatch({ type: GET_TOTAL_ACTIVE_USER_COUNT_SUCCESS, payload: response.data.totalActiveUser });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_TOTAL_ACTIVE_USER_COUNT_FAIL, payload: error.message });
    }
  };
export const getTotalRoleCount = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TOTAL_ROLE_COUNT_REQUEST });
  
      const response = await axiosInstance.get(`/user/getTotalRoleCount`);
      // console.log(response.data.totalRole);
      dispatch({ type: GET_TOTAL_ROLE_COUNT_SUCCESS, payload: response.data.totalRole });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_TOTAL_ROLE_COUNT_FAIL, payload: error.message });
    }
  };
export const getUserApproval = () => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_APPROVAL_REQUEST_REQUEST });
  
      const response = await axiosInstance.get(`/user/getUserApprovalRequest`);
      console.log(response.data);
      dispatch({ type: GET_USER_APPROVAL_REQUEST_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_USER_APPROVAL_REQUEST_FAIL, payload: error.message });
    }
  };
export const getUserApprovalCount = (timePeriod) => async (dispatch) => {
    try {
      dispatch({ type: GET_7DAYS_USER_APPROVAL_REQUEST });
  
      const response = await axiosInstance.get(`/user/getUserApprovalCount${timePeriod}`);
      // console.log(response.data.totalRole);
      dispatch({ type: GET_7DAYS_USER_APPROVAL_SUCCESS, payload: response.data.approvalCounts });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_7DAYS_USER_APPROVAL_FAIL, payload: error.message });
    }
  };
  
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};