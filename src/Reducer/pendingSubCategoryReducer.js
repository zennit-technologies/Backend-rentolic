import * as types from "../Constants/index";

const initialState = {
    pendingSubCatrorys: [],
    loading: true,
};

const pendingSubCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PENDING_SUB_CATEGORY:
            return {
                ...state,
                pendingSubCatrorys: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default pendingSubCategoryReducer;
