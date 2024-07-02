import {
    ADD_DESIGNATION_REQUEST,
    ADD_DESIGNATION_SUCCESS,
    ADD_DESIGNATION_FAIL,
    GET_ALL_DESIGNATION_REQUEST,
    GET_ALL_DESIGNATION_SUCCESS,
    GET_ALL_DESIGNATION_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR,
} from '../constants/designationConstants'

export const designationReducer = (state = {allDesignation:[],message:''}, action) => {
    switch (action.type) {
      case ADD_DESIGNATION_REQUEST:
      case GET_ALL_DESIGNATION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_DESIGNATION_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      case GET_ALL_DESIGNATION_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          allDesignation: action.payload,
        };
      case ADD_DESIGNATION_FAIL:
      case GET_ALL_DESIGNATION_FAIL:
        // console.log(action.payload);
        return {
          ...state,
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