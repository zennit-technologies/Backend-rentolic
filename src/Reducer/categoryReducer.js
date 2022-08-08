import * as types from "../Constants/index";

const initialState = {
  categoryes: [],
  category: {},
  loading: true,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORYS:
      return {
        ...state,
        categoryes: action.payload,
        loading: false,
      };
    case types.DELETE_CATEGORY:
    case types.ADD_CATEGORY:
    case types.UPDATE_CATEGORY:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
