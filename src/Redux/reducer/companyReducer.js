import {
    GET_ALL_COMPANY_REQUEST,
    GET_ALL_COMPANY_SUCCESS,
    GET_ALL_COMPANY_FAIL,
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../constants/companyConstants'

export const companyReducer = (state = {message:''}, action) => {
    switch (action.type) {
      case GET_ALL_COMPANY_REQUEST:
        case ADD_COMPANY_REQUEST:
        return {
          loading: true,
        };
      case GET_ALL_COMPANY_SUCCESS:
        return {
          loading: false,
          allCompany: action.payload,
        };
      case ADD_COMPANY_SUCCESS:
        return {
          loading: false,
          message: action.payload,
        };
      case GET_ALL_COMPANY_FAIL:
      case ADD_COMPANY_FAIL:
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