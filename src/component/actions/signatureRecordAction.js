import {
    ADD_SIGNATURE_RECORD_REQUEST,
    ADD_SIGNATURE_RECORD_SUCCESS,
    ADD_SIGNATURE_RECORD_FAIL,
    GET_SIGNATURE_RECORD_REQUEST,
    GET_SIGNATURE_RECORD_SUCCESS,
    GET_SIGNATURE_RECORD_FAIL,
    UPDATE_SIGNATURE_RECORD_STATUS_REQUEST,
    UPDATE_SIGNATURE_RECORD_STATUS_SUCCESS,
    UPDATE_SIGNATURE_RECORD_STATUS_FAIL,
    GET_ACTIVE_ASSISTANT_DIRECTOR_REQUEST,
    GET_ACTIVE_ASSISTANT_DIRECTOR_SUCCESS,
    GET_ACTIVE_ASSISTANT_DIRECTOR_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../Redux/constants/signatureRecordConstants'
import axiosInstance from '../axiosInstance/axiosInstance';

export const addSignatureRecord = (nameInput, designationInput) => async (dispatch) => {
    try {
      dispatch({ type: ADD_SIGNATURE_RECORD_REQUEST });
      const response = await axiosInstance.post(`/signatureRecord/addSignatureRecord`, { name: nameInput, designation: designationInput });
      // console.log(response.data);
      dispatch({ type: ADD_SIGNATURE_RECORD_SUCCESS, payload: response.data.message });
    } catch (error) {
      // console.log(error);
      dispatch({ type: ADD_SIGNATURE_RECORD_FAIL, payload: error.response.data.message });
    }
  };
export const getAllSignatureRecord = () => async (dispatch) => {
    try {
      dispatch({ type: GET_SIGNATURE_RECORD_REQUEST });
      const response = await axiosInstance.get(`/signatureRecord/getSignatureRecord`,);
      // console.log(response.data.data);
      dispatch({ type: GET_SIGNATURE_RECORD_SUCCESS, payload: response.data.data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: GET_SIGNATURE_RECORD_FAIL, payload: error.response.data.message });
    }
  };

export const updateSignatureRecordStatus = (id,status) => async (dispatch) => {
    try {
      // console.log('enter');
      dispatch({ type: UPDATE_SIGNATURE_RECORD_STATUS_REQUEST });
      const response = await axiosInstance.put(`/signatureRecord/updateSignatureRecord/${id}`,{status:status});
      console.log(response.data.result);
      dispatch({ type: UPDATE_SIGNATURE_RECORD_STATUS_SUCCESS, payload: response.data.result });
    } catch (error) {
      // console.log(error);
      dispatch({ type: UPDATE_SIGNATURE_RECORD_STATUS_FAIL, payload: error.response.data.message });
    }
  };



export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};