import * as types from "../Constants/index";

const initialState = {
  admins: [],
  admin: {},
  loading: true,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
        loading: false,
      };
    case types.DELETE_ADMIN:
    case types.ADD_ADMIN:
    case types.UPDATE_ADMIN:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_ADMIN:
      return {
        ...state,
        admin: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default adminReducer;
