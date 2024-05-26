import axiosInstance from "../axiosInstance/axiosInstance";

import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    CLEAR_ERROR
} from '../Redux/constants/addTaskConstants'

export const addTask = (taskInput, descriptionInput) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TASK_REQUEST });

    const response = await axiosInstance.post(`/user/addTask`, { name: taskInput, description: descriptionInput });
    console.log(response.data);
    dispatch({ type: ADD_TASK_SUCCESS, payload: response.data.message });
  } catch (error) {
    // console.log(error);
    dispatch({ type: ADD_TASK_FAIL, payload: error.response.data.message });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

