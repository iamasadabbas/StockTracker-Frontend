import {
    GET_ALL_REGISTRATION_APPROVAL_REQUEST,
    GET_ALL_REGISTRATION_APPROVAL_SUCCESS,
    GET_ALL_REGISTRATION_APPROVAL_FAIL,
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,
    CLEAR_ERROR,CLEAR_MESSAGE
} from '../Redux/constants/registrationApprovalConstants'
import axiosInstance from '../axiosInstance/axiosInstance';

export const getAllRegistrationApproval = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_REGISTRATION_APPROVAL_REQUEST });
  
      axiosInstance.get(`/user/getRegistartionRequest`)
        .then((response) => {
            // console.log(response);
          dispatch({ type: GET_ALL_REGISTRATION_APPROVAL_SUCCESS, payload: response.data.users });
        })
        .catch((error) => {
          dispatch({ type: GET_ALL_REGISTRATION_APPROVAL_FAIL, payload: error.message });
        });
    } catch (error) {
      dispatch({ type: GET_ALL_REGISTRATION_APPROVAL_FAIL, payload: error.message });
    }
  };
  

  
export const updateRole = (userId,roleId) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ROLE_REQUEST });
  
      axiosInstance.put(`/user/updateRole`,{userId,roleId})
        .then((response) => {
            console.log(response.data.user);
          dispatch({ type: UPDATE_ROLE_SUCCESS, payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: UPDATE_ROLE_FAIL, payload: error.message });
        });
    } catch (error) {
      dispatch({ type: UPDATE_ROLE_FAIL, payload: error.message });
    }
  };
  

  
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};