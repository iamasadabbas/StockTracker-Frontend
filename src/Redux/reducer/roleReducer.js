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
  ASSIGN_TASKS_TO_ROLES_SUCCESS,
  ASSIGN_TASKS_TO_ROLES_FAIL,
  GET_ROLE_TASKS_REQUEST,
  GET_ROLE_TASKS_SUCCESS,
  GET_ROLE_TASKS_FAIL,
  UPDATE_ROLE_TASK_SUCCESS,
  UPDATE_ROLE_TASK_FAIL,
  CLEAR_ERROR,
  CLEAR_MESSAGE
} from "../constants/roleConstant";
export const addRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ROLE_REQUEST:
      return {
        loading: true,
      };
    case ADD_ROLE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case ADD_ROLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
        error: null
      }
    default:
      return state;
  }
};
export const getAllRoleReducer = (state = { allRole: [], allTask: [], roleTasks: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TASK_REQUEST:
    case GET_ALL_ROLE_REQUEST:
    case GET_ROLE_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        allRole: action.payload,
      };
    case GET_ALL_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        allTask: action.payload,
      };
    case GET_ROLE_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        roleTasks: action.payload,
      };
    case ASSIGN_TASKS_TO_ROLES_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_TASK_FAIL:
    case GET_ALL_ROLE_FAIL:
    case GET_ROLE_TASKS_FAIL:
    case UPDATE_ROLE_TASK_FAIL:
    case ASSIGN_TASKS_TO_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ROLE_TASK_SUCCESS:
      return {
        ...state,
        roleTasks: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
