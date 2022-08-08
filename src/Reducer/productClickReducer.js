import * as types from "../Constants/index";

const initialState = {
    productClicks: [],
    productClick: {},
    loading: true,
};

const productClickReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCT_CLICKS:
            return {
                ...state,
                productClick: action.payload,
                loading: false,
            };
        case types.DELETE_PRODUCT_CLICK:
        case types.ADD_PRODUCT_CLICK:
        case types.UPDATE_PRODUCT_CLICK:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_PRODUCT_CLICK:
            return {
                ...state,
                productClick: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default productClickReducer;
