import * as types from "../Constants/index";

const initialState = {
    userProfiles: [],
    userProfile: {},
    loading: true,
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_PROFILES:
            return {
                ...state,
                userProfiles: action.payload,
                loading: false,
            };
        case types.DELETE_USER_PROFILE:
        case types.ADD_USER_PROFILE:
        case types.UPDATE_USER_PROFILE:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default userProfileReducer;
