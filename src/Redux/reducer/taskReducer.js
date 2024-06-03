import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../constants/addTaskConstants'

export const addTaskReducer = (state = {message:''}, action) => {
    switch (action.type) {
      case ADD_TASK_REQUEST:
        return {
          loading: true,
        };
      case ADD_TASK_SUCCESS:
        return {
          loading: false,
          message: action.payload,
        };
      case ADD_TASK_FAIL:
        // console.log(action.payload);
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
        }
      default:
        return state;
    }
};
