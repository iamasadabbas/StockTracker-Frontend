import axiosInstance from '../axiosInstance/axiosInstance'

import {
  GET_ALL_PRODUCT_FROM_LOCATION_REQUEST,
  GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS,
  GET_ALL_PRODUCT_FROM_LOCATION_FAIL,
  GET_ALL_LOCATION_REQUEST,
  GET_ALL_LOCATION_SUCCESS,
  GET_ALL_LOCATION_FAIL,
  SAVE_DEMAND_REQUEST,
  SAVE_DEMAND_SUCCESS,
  SAVE_DEMAND_FAIL,
  GET_ALL_DEMAND_REQUEST,
  GET_ALL_DEMAND_SUCCESS,
  GET_ALL_DEMAND_FAIL,
  POST_DEMAND_QUANTITY_REQUEST,
  POST_DEMAND_QUANTITY_SUCCESS,
  POST_DEMAND_QUANTITY_FAIL,
  UPDATE_DEMAND_STATUS_REQUEST,
  UPDATE_DEMAND_STATUS_SUCCESS,
  UPDATE_DEMAND_STATUS_FAIL,
  GET_ACTIVE_ASSISTANT_DIRECTOR_REQUEST,
  GET_ACTIVE_ASSISTANT_DIRECTOR_SUCCESS,
  GET_ACTIVE_ASSISTANT_DIRECTOR_FAIL,
  GET_DEMAND_BY_ID_REQUEST,
  GET_DEMAND_BY_ID_SUCCESS,
  ADD_PRODUCT_QUANTITY_THROUGH_DEMAND_REQUEST,
  ADD_PRODUCT_QUANTITY_THROUGH_DEMAND_SUCCESS,
  ADD_PRODUCT_QUANTITY_THROUGH_DEMAND_FAIL,
  GET_DEMAND_BY_ID_FAIL,
  CLEAR_ERROR
} from '../Redux/constants/demandConstants'

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_REQUEST })
    axiosInstance.get(`/product/getAllProduct`).then((response) => {
      console.log(response.data.product);
      dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS, payload: response.data.product })
    }) .catch((error) => {
      dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_FAIL, payload: error.message });
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCT_FROM_LOCATION_FAIL, payload: error.data.message })
  }
}
export const getAllLocation = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LOCATION_REQUEST })
    let response = await axiosInstance.get(`/location/getAllLocation`)
    dispatch({ type: GET_ALL_LOCATION_SUCCESS, payload: response.data.allLocation })
  } catch (error) {
    dispatch({ type: GET_ALL_LOCATION_FAIL, payload: error.message })
  }
}


export const getAllDemand = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DEMAND_REQUEST });

    axiosInstance.get(`/demand/getAllDemand`)
      .then((response) => {
        // console.log(response);
        dispatch({ type: GET_ALL_DEMAND_SUCCESS, payload: response.data.demandedProduct });
      })
      .catch((error) => {
        dispatch({ type: GET_ALL_DEMAND_FAIL, payload: error.message });
      });
  } catch (error) {
    dispatch({ type: GET_ALL_DEMAND_FAIL, payload: error.message });
  }
};

export const saveDemand = (demandData) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_DEMAND_REQUEST })
    axiosInstance.post(`/demand/demandProduct`, demandData).then((response) => {
      console.log(response);
      dispatch({ type: SAVE_DEMAND_SUCCESS })
    }).catch((error) => {
      dispatch({ type: SAVE_DEMAND_FAIL, payload: error.message });
    });
  } catch (error) {
    dispatch({ type: SAVE_DEMAND_FAIL, payload: error.message })
  }
}

export const getActiveAssistantDirectorSignatureRecord = () => async (dispatch) => {
  try {
    // console.log('enter');
    dispatch({ type: GET_ACTIVE_ASSISTANT_DIRECTOR_REQUEST });
    const response = await axiosInstance.get(`/signatureRecord/getActiveAssistantDirectorSignatureRecord`);
    // console.log(response.data);
    dispatch({ type: GET_ACTIVE_ASSISTANT_DIRECTOR_SUCCESS, payload: response.data.data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: GET_ACTIVE_ASSISTANT_DIRECTOR_FAIL, payload: error.message });
  }
};

export const postReceivedQuantity = (request_id, product_id, received_quantity) => async (dispatch) => {
  try {
    dispatch({ type: POST_DEMAND_QUANTITY_REQUEST })
    let response = await axiosInstance.put(`/demand/postDemandQunatity/${request_id}/${product_id}`, { received_quantity: received_quantity })
    dispatch({ type: POST_DEMAND_QUANTITY_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: POST_DEMAND_QUANTITY_FAIL, payload: error.message })
  }
}
export const updateDemandStatus = (request_id,status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DEMAND_STATUS_REQUEST })
    let response = await axiosInstance.put(`/demand/updateDemandStatus/${request_id}`, { status:status})
    console.log(response);
    dispatch({ type: UPDATE_DEMAND_STATUS_SUCCESS,payload:response.data.alldemand})
  } catch (error) {
    dispatch({ type: UPDATE_DEMAND_STATUS_FAIL, payload: error.message })
  }
}
export const getDemandById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_DEMAND_BY_ID_REQUEST })
    let response = await axiosInstance.get(`/demand/getDemandById/${id}`)
    // console.log(response);
    dispatch({ type: GET_DEMAND_BY_ID_SUCCESS,payload:response.data.demandedProduct})
  } catch (error) {
    dispatch({ type: GET_DEMAND_BY_ID_FAIL, payload: error.message })
  }
}
export const addProductQuantityThroughDemand = (location_id,product_id,quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_QUANTITY_THROUGH_DEMAND_REQUEST })

    let response = await axiosInstance.post(`/productLocation/addProductQuantityThroughDemand/${location_id}/${product_id}`,{quantity})
    console.log(response);
    dispatch({ type: ADD_PRODUCT_QUANTITY_THROUGH_DEMAND_SUCCESS,payload:response.data.demandedProduct})
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_QUANTITY_THROUGH_DEMAND_FAIL, payload: error.message })
  }
}



export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};