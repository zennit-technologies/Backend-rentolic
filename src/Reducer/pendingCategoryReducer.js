import * as types from "../Constants/index";

const initialState = {
    pendingCatrorys: [],
    loading: true,
};

const pendingCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PENDING_CATEGORY:
            return {
                ...state,
                pendingCatrorys: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default pendingCategoryReducer;
