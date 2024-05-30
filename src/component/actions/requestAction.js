import {
    GET_ALL_REQUEST_REQUEST,
    GET_ALL_REQUEST_SUCCESS,
    GET_ALL_REQUEST_FAIL,
    GET_PRODUCT_QUANTITY_REQUEST,
    GET_PRODUCT_QUANTITY_SUCCESS,
    GET_PRODUCT_QUANTITY_FAIL,
    UPDATE_PRODUCT_QUANTITY_REQUEST,
    UPDATE_PRODUCT_QUANTITY_SUCCESS,
    UPDATE_PRODUCT_QUANTITY_FAIL,
    UPDATE_REQUEST_STATUS_REQUEST,
    UPDATE_REQUEST_STATUS_SUCCESS,
    UPDATE_REQUEST_STATUS_FAIL,
    REQUESTED_PRODUCT_REQUEST,
    REQUESTED_PRODUCT_SUCCESS,
    REQUESTED_PRODUCT_FAIL,
    UPDATE_REQUESTED_PRODUCT_STATUS_REQUEST,
    UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS,
    UPDATE_REQUESTED_PRODUCT_STATUS_FAIL,
    GET_REQUEST_BY_ID_REQUEST,
    GET_REQUEST_BY_ID_SUCCESS,
    GET_REQUEST_BY_ID_FAIL,
    CLEAR_ERROR
} from '../Redux/constants/requestConstant.js'
import axiosInstance from '../axiosInstance/axiosInstance'

export const getAllRequest = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_REQUEST_REQUEST })
      const { data } = await axiosInstance.get(`/request/getAllProductRequest`)
      dispatch({ type: GET_ALL_REQUEST_SUCCESS, payload: data.request })
    } catch (error) {
      dispatch({ type: GET_ALL_REQUEST_FAIL, payload: error.message })
    }
  }
export const getProductQuantity = (product_id) => async (dispatch) => {
  console.log(product_id);
    try {
      dispatch({ type: GET_PRODUCT_QUANTITY_REQUEST })
      const  result  = await axiosInstance.get(`/productLocation/getProductQuantity/${product_id}`)
      // console.log(result);
      dispatch({ type: GET_PRODUCT_QUANTITY_SUCCESS, payload: result.data.request.quantity })
    } catch (error) {
      console.log('error enter');
      dispatch({ type: GET_PRODUCT_QUANTITY_FAIL, payload: error.message })
    }
  }


export const updateRequestedProductStatus = (requestId,productId,received_quantity,status) => async (dispatch) => {
  // console.log(requestId);
    try {
      dispatch({ type: UPDATE_REQUESTED_PRODUCT_STATUS_REQUEST })
      let config = {
        headers: { 'Content-Type': 'application/json' }
    }
      const  result  = await axiosInstance.put(`/request/updateUserRequestedProductById/${requestId}/${productId}`,{ status: `${status}`, received_quantity: `${received_quantity}`,config })
    // console.log(result.data[0]);
      dispatch({ type: UPDATE_REQUESTED_PRODUCT_STATUS_SUCCESS, payload: result.data[0] })
    } catch (error) {
      dispatch({ type: UPDATE_REQUESTED_PRODUCT_STATUS_FAIL, payload: error.data.message })
    }
  }
export const getRequestedProduct = (currentRequestId) => async (dispatch) => {
    try {
      dispatch({ type: REQUESTED_PRODUCT_REQUEST })
      let config = {
        headers: { 'Content-Type': 'application/json' }
    }
      const  result  = await axiosInstance.get(`/request/requestedProduct/${currentRequestId}`,config )
      dispatch({ type: REQUESTED_PRODUCT_SUCCESS, payload: result.data.request.product_id })
    } catch (error) {
      dispatch({ type: REQUESTED_PRODUCT_FAIL, payload: error.data.message })
    }
  }

  export const updateProductQuantity = (productId,remainingQuantity) => async (dispatch) => {
    // console.log(productId);
      try {
        dispatch({ type: UPDATE_PRODUCT_QUANTITY_REQUEST })
        const  result  = await axiosInstance.post(`/productLocation/updateProductQuantityByProductId/${productId}`,{quantity:remainingQuantity})
        // console.log(result);
        dispatch({ type: UPDATE_PRODUCT_QUANTITY_SUCCESS, payload: result.data.message })
      } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_QUANTITY_FAIL, payload: error.message })
      }
    }
export const getRequestById = (currentRequestId) => async (dispatch) => {
  // console.log(currentRequestId);
    try {
      dispatch({ type: GET_REQUEST_BY_ID_REQUEST })
      let config = {
        headers: { 'Content-Type': 'application/json' }
    }
      const  result  = await axiosInstance.get(`/request/getRequestById/${currentRequestId}` )
      // console.log(result.data.request);
      dispatch({ type: GET_REQUEST_BY_ID_SUCCESS, payload: result.data.request })
    } catch (error) {
      dispatch({ type: GET_REQUEST_BY_ID_FAIL, payload: error.message })
    }
  }

  export const updateRequestStatus = (currentRequestId, requestStatus) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_REQUEST_STATUS_REQUEST });
  
      let config = {
        headers: { 'Content-Type': 'application/json' }
      };
       const result = await axiosInstance.put(`/request/updateRequestStatus/${currentRequestId}`, { status: requestStatus }, config);
  
      if (result) {
        dispatch({ type: UPDATE_REQUEST_STATUS_SUCCESS, payload: result.data });
      }
    } catch (error) {
      dispatch({ type: UPDATE_REQUEST_STATUS_FAIL, payload: error.data.message });
    }
  };
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
