import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    GET_ALL_ROLE_REQUEST,
    GET_ALL_ROLE_SUCCESS,
    GET_ALL_ROLE_FAIL,
    GET_ALL_DESIGNATION_REQUEST,
    GET_ALL_DESIGNATION_SUCCESS,
    GET_ALL_DESIGNATION_FAIL,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_SUCCESS,
    UPDATE_USER_STATUS_FAIL,
    CLEAR_MESSAGE,
    CLEAR_ERROR
} from '../constants/userConstants'

export const userReducer = (state = { message: '', allRole: [],allUser:[],allDesignation:[] }, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
        case GET_ALL_ROLE_REQUEST:
        case GET_ALL_DESIGNATION_REQUEST:
        case GET_ALL_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case UPDATE_USER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case GET_ALL_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                allUser: action.payload,
            };
        case UPDATE_USER_STATUS_SUCCESS:

            return {
                ...state,
                loading: false,
                allUser: action.payload.user,
            };
        case GET_ALL_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                allRole: action.payload,
            };
        case GET_ALL_DESIGNATION_SUCCESS:
            return {
                ...state,
                loading: false,
                allDesignation: action.payload,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case ADD_USER_FAIL:
        case GET_ALL_ROLE_FAIL:
        case GET_ALL_DESIGNATION_FAIL:
        case GET_ALL_USER_FAIL:
        case DELETE_USER_FAIL:
        case UPDATE_USER_STATUS_FAIL:
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
