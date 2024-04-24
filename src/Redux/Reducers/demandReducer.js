import { ADD_DEMAND_DATA, CLEAR_DEMAND_DATA, DEMAND_DETAIL } from "../Constants/constants";

// counterReducer.js
const initialState = {
  data: [],
  detail: null,

}



export const demandReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEMAND_DATA:
      console.log("Adding demand data:", action.payload);
      return {
        ...state,
        data: [...state.data,action.payload] // Concatenating the new data with the existing data array
      };

    case DEMAND_DETAIL:
      return { ...state, detail: action.payload }

    case CLEAR_DEMAND_DATA:
      return []

    default:
      return state;
  }
};


