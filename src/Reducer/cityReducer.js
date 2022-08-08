import * as types from "../Constants/index";

const initialState = {
  citys: [],
  city: {},
  loading: true,
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CITYS:
      return {
        ...state,
        citys: action.payload,
        loading: false,
      };
    case types.DELETE_CITY:
    case types.ADD_CITY:
    case types.UPDATE_CITY:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_CITY:
      return {
        ...state,
        city: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default cityReducer;
