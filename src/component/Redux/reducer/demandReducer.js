import { 
  ADD_DEMAND_DATA,
  UPDATE_DATA, 
  CLEAR_DEMAND_DATA, 
  DEMAND_DETAIL,
   CURRENT_DEMAND, 
   CLEAR_DETAILS,
   GET_ALL_PRODUCT_FROM_LOCATION_REQUEST,
   GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS,
   GET_ALL_PRODUCT_FROM_LOCATION_FAIL,
   GET_ALL_LOCATION_REQUEST,
   GET_ALL_LOCATION_SUCCESS,
   GET_ALL_LOCATION_FAIL,
   GET_ALL_DEMAND_REQUEST,
   GET_ALL_DEMAND_SUCCESS,
   GET_ALL_DEMAND_FAIL,
   POST_DEMAND_QUANTITY_REQUEST,
   POST_DEMAND_QUANTITY_SUCCESS,
   POST_DEMAND_QUANTITY_FAIL,
   UPDATE_DEMAND_STATUS_REQUEST,
   UPDATE_DEMAND_STATUS_SUCCESS,
   UPDATE_DEMAND_STATUS_FAIL,
   GET_ACTIVE_ASSISTANT_DIRECTOR_REQUEST,
   GET_ACTIVE_ASSISTANT_DIRECTOR_SUCCESS,
   GET_ACTIVE_ASSISTANT_DIRECTOR_FAIL,
   GET_DEMAND_BY_ID_REQUEST,
   GET_DEMAND_BY_ID_SUCCESS,
   GET_DEMAND_BY_ID_FAIL,
   CLEAR_MESSAGE,
   CLEAR_ERROR
   } from "../constants/demandConstants";

// counterReducer.js
const initialState = {
  data: [],
  detail: null,
  currentDemand: [],
  AssistantDirector:[]

}
export const demandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_ASSISTANT_DIRECTOR_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ACTIVE_ASSISTANT_DIRECTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        AssistantDirector: action.payload
      };
    case GET_ACTIVE_ASSISTANT_DIRECTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_DEMAND_DATA:
      // console.log("Adding demand data:", action.payload);
      return {
        ...state,
        data: [...state.data, action.payload] // Concatenating the new data with the existing data array
      };
    case DEMAND_DETAIL:
      return { 
        ...state, 
        detail: action.payload 
      };
    case CLEAR_DEMAND_DATA:
      return {
        ...state,
        data: [], // Clear the demand data but keep other state properties
        currentDemand: null, // Reset other properties if needed
        detail: null,
        error: null,
        loading: false
      };
    case CURRENT_DEMAND:
      return {
        ...state, 
        currentDemand: action.payload 
      };
    case UPDATE_DATA:
      return { 
        ...state, 
        data: action.payload 
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        detail: null, // Clear only the detail property
        error: null,
        loading: false
      };
    default:
      return state;
  }
};






export const allProductReducer = (state = {allProduct: []}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_FROM_LOCATION_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PRODUCT_FROM_LOCATION_SUCCESS:
      return {
        loading: false,
        allProduct: action.payload,
      };
    case GET_ALL_PRODUCT_FROM_LOCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERROR:
        return{
            ...state,
            error:null
        }
    default:
      return state;
  }
};
export const allLocationReducer = (state = {allLocation: []}, action) => {
  switch (action.type) {
    case GET_ALL_LOCATION_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_LOCATION_SUCCESS:
      return {
        loading: false,
        allLocation: action.payload,
      };
    case GET_ALL_LOCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
    default:
      return state;
  }
};
export const allDemandReducer = (state = {allDemand: [],AssistantDirector:[],currentDemand:[]}, action) => {
  switch (action.type) {
    case UPDATE_DEMAND_STATUS_REQUEST:
    case GET_ALL_DEMAND_REQUEST:
    case GET_DEMAND_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DEMAND_STATUS_SUCCESS:
    case GET_ALL_DEMAND_SUCCESS:
      return {
        ...state,
        loading: false,
        allDemand: action.payload,
      };
      case GET_DEMAND_BY_ID_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        currentDemand: action.payload,
      };
    case GET_ALL_DEMAND_FAIL:
    case UPDATE_DEMAND_STATUS_FAIL:
    case GET_DEMAND_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
    default:
      return state;
  }
};
export const postDemandQuantityReducer = (state = {message:''}, action) => {
  switch (action.type) {
    case POST_DEMAND_QUANTITY_REQUEST:
      return {
        loading: true,
      };
    case POST_DEMAND_QUANTITY_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case POST_DEMAND_QUANTITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
      case CLEAR_MESSAGE:
            return{
                ...state,
                message:null,
                error:null
            }
    default:
      return state;
  }
};



