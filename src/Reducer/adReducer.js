import * as types from "../Constants/index";

const initialState = {
    ads: [],
    ad: {},
    loading: true,
};

const adReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ADS:
            return {
                ...state,
                ads: action.payload,
                loading: false,
            };
        case types.DELETE_AD:
        case types.ADD_AD:
        case types.UPDATE_AD:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_AD:
            return {
                ...state,
                ad: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default adReducer;
