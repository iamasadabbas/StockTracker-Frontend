import { act } from 'react';
import {
    GET_ALL_REGISTRATION_APPROVAL_REQUEST,
    GET_ALL_REGISTRATION_APPROVAL_SUCCESS,
    GET_ALL_REGISTRATION_APPROVAL_FAIL,
    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,
    CLEAR_ERROR,
    CLEAR_MESSAGE
} from '../constants/registrationApprovalConstants'

export const allRegistrationApproval = (state = {message:''}, action) => {
    switch (action.type) {
      case GET_ALL_REGISTRATION_APPROVAL_REQUEST:
      case UPDATE_ROLE_REQUEST:
        return {
            ...state,
          loading: true,
        };
      case GET_ALL_REGISTRATION_APPROVAL_SUCCESS:
        return {
            ...state,
          loading: false,
          allRegistration: action.payload,
        };
      case UPDATE_ROLE_SUCCESS:
        return {
            ...state,
          loading: false,
          allRegistration: action.payload.user,
          message: action.payload.message
        };
      case GET_ALL_REGISTRATION_APPROVAL_FAIL:
      case UPDATE_ROLE_FAIL:
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