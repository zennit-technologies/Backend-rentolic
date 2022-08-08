import * as types from "../Constants/index";

const initialState = {
    states: [],
    loading: true,
};

const statesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_STATES:
            return {
                ...state,
                states: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default statesReducer;
