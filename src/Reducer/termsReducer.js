import * as types from "../Constants/index";

const initialState = {
    terms: [],
    term: {},
    loading: true,
};

const termsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TERMS:
            return {
                ...state,
                terms: action.payload,
                loading: false,
            };
        case types.DELETE_TERM:
        case types.ADD_TERM:
        case types.UPDATE_TERM:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_TERM:
            return {
                ...state,
                term: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default termsReducer;
