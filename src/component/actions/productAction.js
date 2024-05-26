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
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../Redux/constants/productConstants'
import axiosInstance from '../axiosInstance/axiosInstance'

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

export const addProduct = (name, specifications, selectedTypeId, description) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST })
        const result = await axiosInstance.post(`/product/addProduct`, {
            name: name,
            specifications: specifications,
            type_id: selectedTypeId,
            description: description,
        })
        console.log(result.data.message);
          dispatch({ type: ADD_PRODUCT_SUCCESS, payload: result.data.message })
    } catch (error) {
        dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message })
    }
}



export const addProductType = (productTypeInput) => async (dispatch) => {
    // console.log('enter');
    try {
        dispatch({ type: ADD_PRODUCT_TYPE_REQUEST })
        const result = await axiosInstance.post(`/product/addProductType`, {
            name: productTypeInput
        })
        console.log(result.data.message);
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