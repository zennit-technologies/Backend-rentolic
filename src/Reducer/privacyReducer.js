import * as types from "../Constants/index";

const initialState = {
    privacys: [],
    privacy: {},
    loading: true,
};

const privacyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRIVACYS:
            return {
                ...state,
                privacys: action.payload,
                loading: false,
            };
        case types.DELETE_PRIVACY:
        case types.ADD_PRIVACY:
        case types.UPDATE_PRIVACY:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_PRIVACY:
            return {
                ...state,
                privacy: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default privacyReducer;
