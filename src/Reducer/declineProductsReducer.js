import * as types from "../Constants/index";

const initialState = {
    declines: [],
    decline: {},
    loading: true,
};

const adReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DECLINES:
            return {
                ...state,
                declines: action.payload,
                loading: false,
            };
        case types.DELETE_DECLINE:
        case types.ADD_DECLINE:
        case types.UPDATE_DECLINE:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_DECLINE:
            return {
                ...state,
                decline: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default adReducer;