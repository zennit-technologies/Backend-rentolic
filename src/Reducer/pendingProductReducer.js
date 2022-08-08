import * as types from "../Constants/index";

const initialState = {
    pendingProducts: [],
    loading: true,
};

const pendingProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PENDING_PRODUCT: 
            return {
                ...state,
                pendingProducts: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default pendingProductReducer;
