import * as types from "../Constants/index";

const initialState = {
    subCategoryes: [],
    subCategory: {},
    loading: true,
};

const subCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SUB_CATEGORYS:
            return {
                ...state,
                subCategoryes: action.payload,
                loading: false,
            };
        case types.DELETE_SUB_CATEGORY:
        case types.ADD_SUB_CATEGORY:
        case types.UPDATE_SUB_CATEGORY:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_SUB_CATEGORY:
            return {
                ...state,
                subCategory: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default subCategoryReducer;
