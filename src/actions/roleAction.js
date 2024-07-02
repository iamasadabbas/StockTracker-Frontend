import axiosInstance from '../axiosInstance/axiosInstance'

import {
    ADD_ROLE_REQUEST,
    ADD_ROLE_SUCCESS,
    ADD_ROLE_FAIL,
    GET_ALL_ROLE_REQUEST,
    GET_ALL_ROLE_SUCCESS,
    GET_ALL_ROLE_FAIL,
    GET_ALL_TASK_REQUEST,
    GET_ALL_TASK_SUCCESS,
    GET_ALL_TASK_FAIL,
    GET_ROLE_TASKS_REQUEST,
    GET_ROLE_TASKS_SUCCESS,
    GET_ROLE_TASKS_FAIL,
    ASSIGN_TASKS_TO_ROLES_SUCCESS,
    ASSIGN_TASKS_TO_ROLES_FAIL,
    UPDATE_ROLE_TASK_SUCCESS,
    UPDATE_ROLE_TASK_FAIL,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
} from '../Redux/constants/roleConstant'

export const addRole = (roleInput, descriptionInput) => async (dispatch) => {
    try {
      dispatch({ type: ADD_ROLE_REQUEST });
  
      const response = await axiosInstance.post(`/user/addRole`, { name: roleInput, description: descriptionInput });
  
      dispatch({ type: ADD_ROLE_SUCCESS, payload: response.data.message });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: ADD_ROLE_FAIL, payload: errorMessage });
    }
  };
export const getAllRole = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ROLE_REQUEST });
  
      const response = await axiosInstance.get(`/user/getRole`);
      dispatch({ type: GET_ALL_ROLE_SUCCESS, payload: response.data.role });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: GET_ALL_ROLE_FAIL, payload: errorMessage });
    }
  };
export const getAllTask = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_TASK_REQUEST });
  
      const response = await axiosInstance.get(`/user/getAllTask`);
      // console.log(response);
      dispatch({ type: GET_ALL_TASK_SUCCESS, payload: response.data.task });
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message;
  
      dispatch({ type: GET_ALL_TASK_FAIL, payload: errorMessage });
    }
  };

  export const assignTasksToRoles = (roleIds, taskIds) => async (dispatch) => {
    try {
        const promises = roleIds.map(roleId => {
            const formData = new FormData();
            formData.append('role_id', roleId);
            taskIds.forEach(taskId => {
                formData.append('task_id[][task_id]', taskId);
            });
            return axiosInstance.post(`/user/assignRoleTask`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
        });

        await Promise.all(promises);

        dispatch({ type: ASSIGN_TASKS_TO_ROLES_SUCCESS });
    } catch (error) {
        dispatch({ type: ASSIGN_TASKS_TO_ROLES_FAIL, payload: error.response });
    }
};


export const getRoleTasks = (roleId) => async (dispatch) => {
  try {
      dispatch({ type: GET_ROLE_TASKS_REQUEST });

      const { data } = await axiosInstance.get(`/user/getRoleTask/${roleId}`);

      dispatch({ type: GET_ROLE_TASKS_SUCCESS, payload: data[0].task_id });
  } catch (error) {
      dispatch({ type: GET_ROLE_TASKS_FAIL, payload: error.response.data.message });
  }
};

export const updateRoleTask = (roleId, taskId, status) => async (dispatch) => {
  try {
     const result =await axiosInstance.put(`/user/updateAssignRoleTask/${roleId}/${taskId}`, { status });
      dispatch({ type: UPDATE_ROLE_TASK_SUCCESS, payload: result.data.task_id });
  } catch (error) {
      dispatch({ type: UPDATE_ROLE_TASK_FAIL, payload: error.response.data.message });
  }
};
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };
  export const clearMessage = () => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGE });
  };
