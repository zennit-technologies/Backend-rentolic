import * as types from "../Constants/index";

const initialState = {
    pendingCitys: [],
    loading: true,
};

const pendingCityReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PENDING_CITYS:
            return {
                ...state,
                pendingCitys: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default pendingCityReducer;
