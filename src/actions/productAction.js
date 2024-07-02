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
} from '../Redux/constants/productConstants'
import axiosInstance from '../axiosInstance/axiosInstance'
let config = {
    headers: { 'Content-Type': 'application/json' }
  }

export const getAllProduct = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PRODUCT_REQUEST })
      axiosInstance.get(`/product/getAllProduct`).then((response) => {
        console.log(response.data.product);
        dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: response.data.product })
      }) .catch((error) => {
        dispatch({ type: GET_ALL_PRODUCT_FAIL, payload: error.message });
      });
    } catch (error) {
      dispatch({ type: GET_ALL_PRODUCT_FAIL, payload: error.data.message })
    }
  }

export const getAllProductType = () => async (dispatch) => {
    console.log('enter');
    try {
        dispatch({ type: GET_ALL_PRODUCT_TYPE_REQUEST })
        const result = await axiosInstance.get(`/product/getProductType`)
        dispatch({ type: GET_ALL_PRODUCT_TYPE_SUCCESS, payload: result.data.product })
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCT_TYPE_FAIL, payload: error.message })
    }
}
export const getAllProductFromLocation = (location_id) => async (dispatch) => {
    // console.log('enter');
    try {
        dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_REQUEST })
        const result = await axiosInstance.get(`/productlocation/getProductByLocationId/${location_id}`)
        console.log(result);
        dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS, payload: result.data.request })
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_FAIL, payload: error.message })
    }
}

export const addProduct = (myForm ) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST })
        const result = await axiosInstance.post(`/product/addProduct`, myForm,config)
        console.log(result.data);
          dispatch({ type: ADD_PRODUCT_SUCCESS, payload: result.data })
    } catch (error) {
        console.log(error);
        dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message })
    }
}



export const addProductType = (formData) => async (dispatch) => {
    // console.log('enter');
    try {
        dispatch({ type: ADD_PRODUCT_TYPE_REQUEST })
        const result = await axiosInstance.post(`/product/addProductType`,formData)
        console.log(result.data);
          dispatch({ type: ADD_PRODUCT_TYPE_SUCCESS, payload: result.data.message })
    } catch (error) {
        dispatch({ type: ADD_PRODUCT_TYPE_FAIL, payload: error.message })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
};