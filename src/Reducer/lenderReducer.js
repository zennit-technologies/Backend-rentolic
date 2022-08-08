import * as types from "../Constants/index";

const initialState = {
  lenders: [],
  lender: {},
  loading: true,
};

const lenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LENDER:
      return {
        ...state,
        lenders: action.payload,
        loading: false,
      };
    case types.ADD_LENDER:
    case types.DELETE_LENDER:
    case types.UPDATE_LENDER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_LENDER:
      return {
        ...state,
        lender : action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default lenderReducer;
