import * as types from "../Constants/index";

const initialState = {
    apps: [],
    app: {},
    loading: true,
};

const adReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_APPS:
            return {
                ...state,
                apps: action.payload,
                loading: false,
            };
        case types.DELETE_APP:
        case types.ADD_APP:
        case types.UPDATE_APP:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_APP:
            return {
                ...state,
                app: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default adReducer;