import * as types from "../Constants/index";

const initialState = {
    adsSubCategorys: [],
    adsSubCategory: {},
    loading: true,
};

const subCategoryAdsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SUB_CATEGORY_ADS:
            return {
                ...state,
                adsSubCategorys: action.payload,
                loading: false,
            };
        case types.DELETE_SUB_CATEGORY_AD:
        case types.ADD_SUB_CATEGORY_AD:
        case types.UPDATE_SUB_CATEGORY_AD:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_SUB_CATEGORY_AD:
            return {
                ...state,
                adsSubCategory: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default subCategoryAdsReducer;
