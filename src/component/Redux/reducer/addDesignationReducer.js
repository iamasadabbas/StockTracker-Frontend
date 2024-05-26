import {
    ADD_DESIGNATION_REQUEST,
    ADD_DESIGNATION_SUCCESS,
    ADD_DESIGNATION_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR,
} from '../constants/addDesignationConstants'

export const addDesignationReducer = (state = {message:''}, action) => {
    switch (action.type) {
      case ADD_DESIGNATION_REQUEST:
        return {
          loading: true,
        };
      case ADD_DESIGNATION_SUCCESS:
        return {
          loading: false,
          message: action.payload,
        };
      case ADD_DESIGNATION_FAIL:
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