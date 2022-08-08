import * as types from "../Constants/index";

const initialState = {
    blogs: [],
    blog: {},
    loading: true,
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
                loading: false,
            };
        case types.DELETE_BLOG:
        case types.ADD_BLOG:
        case types.UPDATE_BLOG:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_BLOG:
            return {
                ...state,
                blog: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default blogReducer;
