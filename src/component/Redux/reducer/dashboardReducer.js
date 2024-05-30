import {
    GET_PRODUCT_COUNT_REQUEST,
    GET_PRODUCT_COUNT_SUCCESS,
    GET_PRODUCT_COUNT_FAIL,
    GET_WAITING_REQUEST_COUNT_REQUEST,
    GET_WAITING_REQUEST_COUNT_SUCCESS,
    GET_WAITING_REQUEST_COUNT_FAIL,
    GET_7DAYS_PRODUCT_REQUEST_REQUEST,
    GET_7DAYS_PRODUCT_REQUEST_SUCCESS,
    GET_7DAYS_PRODUCT_REQUEST_FAIL,
    GET_TOTAL_USER_COUNT_REQUEST,
    GET_TOTAL_USER_COUNT_SUCCESS,
    GET_TOTAL_USER_COUNT_FAIL,
    GET_TOTAL_ACTIVE_USER_COUNT_REQUEST,
    GET_TOTAL_ACTIVE_USER_COUNT_SUCCESS,
    GET_TOTAL_ACTIVE_USER_COUNT_FAIL,
    GET_TOTAL_ROLE_COUNT_REQUEST,
    GET_TOTAL_ROLE_COUNT_SUCCESS,
    GET_TOTAL_ROLE_COUNT_FAIL,
    GET_USER_APPROVAL_REQUEST_REQUEST,
    GET_USER_APPROVAL_REQUEST_SUCCESS,
    GET_USER_APPROVAL_REQUEST_FAIL,
    GET_7DAYS_USER_APPROVAL_REQUEST,
    GET_7DAYS_USER_APPROVAL_SUCCESS,
    GET_7DAYS_USER_APPROVAL_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../constants/dashboardConstants'


export const dashboardReducer = (state = {message:'',productCount:0}, action) => {
    switch (action.type) {
      case GET_PRODUCT_COUNT_REQUEST:
      case GET_WAITING_REQUEST_COUNT_REQUEST:
      case GET_7DAYS_PRODUCT_REQUEST_REQUEST:
      case GET_TOTAL_USER_COUNT_REQUEST:
      case GET_TOTAL_ACTIVE_USER_COUNT_REQUEST:
      case GET_TOTAL_ROLE_COUNT_REQUEST:
      case GET_USER_APPROVAL_REQUEST_REQUEST:
      case GET_7DAYS_USER_APPROVAL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_PRODUCT_COUNT_SUCCESS:
      
        return {
            ...state,
          loading: false,
          productCount: action.payload.productCount,
          lowStockProduct: action.payload.lowStockProduct,
          outOfStockProduct: action.payload.outOfStockProduct,
        };
      case GET_WAITING_REQUEST_COUNT_SUCCESS:
        // console.log(action.payload.request);
        return {
            ...state,
          loading: false,
          waitingRequestCount:action.payload.waitingRequestCount,
          request:action.payload.request
        };
      case GET_TOTAL_USER_COUNT_SUCCESS:
        return {
            ...state,
          loading: false,
          totalUser:action.payload
        };
      case GET_TOTAL_ACTIVE_USER_COUNT_SUCCESS:
        return {
            ...state,
          loading: false,
          totalActiveUser:action.payload
        };
      case GET_TOTAL_ROLE_COUNT_SUCCESS:
        return {
            ...state,
          loading: false,
          totalRole:action.payload
        };
      case GET_7DAYS_PRODUCT_REQUEST_SUCCESS:
        // console.log(action.payload);
        return {
            ...state,
          loading: false,
          requestCounts:action.payload.requestCounts
        };
      case GET_7DAYS_USER_APPROVAL_SUCCESS:
        return {
            ...state,
          loading: false,
          approvalCounts:action.payload
        };
      case GET_USER_APPROVAL_REQUEST_SUCCESS:
        return {
            ...state,
          loading: false,
          totalUserApproval:action.payload.totalUserApprovalRequest,
          userApproval:action.payload.userApprovalRequest
        };
      case GET_PRODUCT_COUNT_FAIL:
      case GET_WAITING_REQUEST_COUNT_FAIL:
      case GET_7DAYS_PRODUCT_REQUEST_FAIL:
      case GET_TOTAL_USER_COUNT_FAIL:
      case GET_TOTAL_ACTIVE_USER_COUNT_FAIL:
      case GET_TOTAL_ROLE_COUNT_FAIL:
      case GET_USER_APPROVAL_REQUEST_FAIL:
      case GET_7DAYS_USER_APPROVAL_FAIL:
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