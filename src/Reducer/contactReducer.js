import * as types from "../Constants/index";

const initialState = {
  contactuss: [],
  contactus: {},
  loading: true,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTACTUSS:
      return {
        ...state,
        contactuss: action.payload,  
        loading: false,
      };
    case types.DELETE_CONTACTUS:
    case types.ADD_CONTACTUS:
    case types.UPDATE_CONTACTUS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_CONTACTUS:
      return {
        ...state,
        contactus: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default contactReducer;
