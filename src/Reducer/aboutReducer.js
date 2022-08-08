import * as types from "../Constants/index";

const initialState = {
  abouts: [],
  about: {},
  loading: true,
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ABOUTS:
      return {
        ...state,
        abouts: action.payload,
        loading: false, 
      };
    case types.DELETE_ABOUT:
    case types.ADD_ABOUT:
    case types.UPDATE_ABOUT:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_ABOUT:
      return {
        ...state,
        about: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default aboutReducer;
