import * as types from "../Constants/index";

const initialState = {
  bookings: [],
  booking: {},
  loading: true,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      };
    case types.DELETE_BOOKING:
    case types.ADD_BOOKING:
    case types.UPDATE_BOOKING:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookingReducer;
