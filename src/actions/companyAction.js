import {
    GET_ALL_COMPANY_REQUEST,
    GET_ALL_COMPANY_SUCCESS,
    GET_ALL_COMPANY_FAIL,
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAIL,
    CLEAR_ERROR,
    CLEAR_MESSAGE
} from '../Redux/constants/companyConstants'

import axiosInstance from '../axiosInstance/axiosInstance'
let config = {
  headers: { 'Content-Type': 'application/json' }
}

export const getAllCompany = () => async (dispatch) => {
    // console.log('enter the get');
      try {
        dispatch({ type: GET_ALL_COMPANY_REQUEST });
    
        const response = await axiosInstance.get(`/product/getProductCompany`);
        // console.log(response.data);
        dispatch({ type: GET_ALL_COMPANY_SUCCESS, payload: response.data.product });
      } catch (error) {
        console.log(error);
        dispatch({ type: GET_ALL_COMPANY_FAIL, payload: error.message });
      }
    };
export const AddCompany = (myForm) => async (dispatch) => {
    // console.log('enter the get');
      try {
        dispatch({ type: ADD_COMPANY_REQUEST });
    
        const response = await axiosInstance.post(`/product/addProductCompany`,myForm,config);
        // console.log(response.data);
        dispatch({ type: ADD_COMPANY_SUCCESS, payload: response.data.message });
      } catch (error) {
        console.log(error);
        dispatch({ type: ADD_COMPANY_FAIL, payload: error.message });
      }
    };