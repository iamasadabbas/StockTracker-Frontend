import {
  ADD_SIGNATURE_RECORD_REQUEST,
  ADD_SIGNATURE_RECORD_SUCCESS,
  ADD_SIGNATURE_RECORD_FAIL,
  GET_SIGNATURE_RECORD_REQUEST,
  GET_SIGNATURE_RECORD_SUCCESS,
  GET_SIGNATURE_RECORD_FAIL,
  UPDATE_SIGNATURE_RECORD_STATUS_REQUEST,
  UPDATE_SIGNATURE_RECORD_STATUS_SUCCESS,
  UPDATE_SIGNATURE_RECORD_STATUS_FAIL,
  CLEAR_MESSAGE,
  CLEAR_ERROR
} from '../constants/signatureRecordConstants'

export const addSignatureRecordReducer = (state = {message:'', allSignatureRecord: []}, action) => {
  switch (action.type) {
      case ADD_SIGNATURE_RECORD_REQUEST:
      case GET_SIGNATURE_RECORD_REQUEST:
      case UPDATE_SIGNATURE_RECORD_STATUS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case ADD_SIGNATURE_RECORD_SUCCESS:
          return {
              ...state,
              loading: false,
              message: action.payload,
          };
      case GET_SIGNATURE_RECORD_SUCCESS:
      case UPDATE_SIGNATURE_RECORD_STATUS_SUCCESS:
          return {
              ...state,
              loading: false,
              allSignatureRecord: action.payload,
          };
      case ADD_SIGNATURE_RECORD_FAIL:
      case GET_SIGNATURE_RECORD_FAIL:
      case UPDATE_SIGNATURE_RECORD_STATUS_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      case CLEAR_ERROR:
          return {
              ...state,
              error: null
          };
      case CLEAR_MESSAGE:
          return {
              ...state,
              message: null,
              error: null
          };
      default:
          return state;
  }
};
