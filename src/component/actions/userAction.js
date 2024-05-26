import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    GET_ALL_ROLE_REQUEST,
    GET_ALL_ROLE_SUCCESS,
    GET_ALL_ROLE_FAIL,
    GET_ALL_DESIGNATION_REQUEST,
    GET_ALL_DESIGNATION_SUCCESS,
    GET_ALL_DESIGNATION_FAIL,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CLEAR_ERROR
} from '../Redux/constants/userConstants'
import axiosInstance from '../axiosInstance/axiosInstance';

export const addUser = (name,email,password,phone_No,selectedDesignationId,selectedRoleId) => async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
  
      const response = await axiosInstance.post(`/user/registerUser`,
        {name: name,
        email: email,
        password: password,
        phone_no: phone_No,
        designation_id:selectedDesignationId,
        role_id: selectedRoleId});

      console.log(response);
      dispatch({ type: ADD_USER_SUCCESS, payload: response.data.message });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: ADD_USER_FAIL, payload: errorMessage });
    }
  };

  export const getAllRole = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ROLE_REQUEST });
  
      const response = await axiosInstance.get(`/user/getRole`);
      console.log(response.data.role);
      dispatch({ type: GET_ALL_ROLE_SUCCESS, payload: response.data.role });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: GET_ALL_ROLE_FAIL, payload: errorMessage });
    }
  };
  export const getAllUser = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_USER_REQUEST });
  
      const response = await axiosInstance.get(`/user/getAlluser`);
      
      dispatch({ type: GET_ALL_USER_SUCCESS, payload: response.data.users });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: GET_ALL_USER_FAIL, payload: errorMessage });
    }
  };
  export const getAllDesignation = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_DESIGNATION_REQUEST });
      const response = await axiosInstance.get(`/user/getDesignation`);
      console.log(response.data.designation);
      dispatch({ type: GET_ALL_DESIGNATION_SUCCESS, payload: response.data.designation });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: GET_ALL_DESIGNATION_FAIL, payload: errorMessage });
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const response = await axiosInstance.delete(`/user/removeUser/${id}`);
      console.log(response);
      dispatch({ type: DELETE_USER_SUCCESS, payload: response.data.message });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: DELETE_USER_FAIL, payload: errorMessage });
    }
  };

  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };