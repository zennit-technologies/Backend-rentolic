import * as types from "../Constants/index";

const initialState = {
    testis: [],
    testi: {},
    loading: true,
};

const testiReducer = (state = initialState, action) => {
    switch (action.type) { 
        case types.GET_TESTIS:
            return {
                ...state,
                testis: action.payload,
                loading: false,
            };
        case types.DELETE_TESTI:
        case types.ADD_TESTI:
        case types.UPDATE_TESTI:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_TESTI:
            return {
                ...state,
                testi: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default testiReducer;
