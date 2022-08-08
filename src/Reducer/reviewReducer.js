import * as types from "../Constants/index";

const initialState = {
  reviews: [],
  review: {},
  loading: true,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REVIEW:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    case types.DELETE_REVIEW:
    case types.ADD_REVIEW:
    case types.UPDATE_REVIEW:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_REVIEW:
      return {
        ...state,
        review: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reviewReducer;
