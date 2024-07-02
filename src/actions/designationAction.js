import {
    ADD_DESIGNATION_REQUEST,
    ADD_DESIGNATION_SUCCESS,
    ADD_DESIGNATION_FAIL,
    GET_ALL_DESIGNATION_REQUEST,
    GET_ALL_DESIGNATION_SUCCESS,
    GET_ALL_DESIGNATION_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR,
} from '../Redux/constants/designationConstants'
import axiosInstance from '../axiosInstance/axiosInstance';

export const addDesignation = (nameInput, descriptionInput) => async (dispatch) => {
    try {
      dispatch({ type: ADD_DESIGNATION_REQUEST });
  
      const response = await axiosInstance.post(`/user/addDesignation`, { name: nameInput, description: descriptionInput });
      console.log(response.data);
      dispatch({ type: ADD_DESIGNATION_SUCCESS, payload: response.data.message });
    } catch (error) {
      // console.log(error);
      dispatch({ type: ADD_DESIGNATION_FAIL, payload: error.response.data.message });
    }
  };
export const getAllDesignation = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_DESIGNATION_REQUEST });
  
      const response = await axiosInstance.get(`/user/getDesignation`);
      console.log(response.data.designation);
      dispatch({ type: GET_ALL_DESIGNATION_SUCCESS, payload: response.data.designation });
    } catch (error) {
      // console.log(error);
      dispatch({ type: GET_ALL_DESIGNATION_FAIL, payload: error.response.data.message });
    }
  };

  export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};

  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };