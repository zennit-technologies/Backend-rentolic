import * as types from "../Constants/index";

const initialState = {
    userComplaints: [],
    userComplaint: {},
    loading: true,
};

const userComplaintReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_COMPLAINTS:
            return {
                ...state,
                userComplaints: action.payload,
                loading: false,
            };
        case types.DELETE_USER_COMPLAINT:
        case types.ADD_USER_COMPLAINT:
        case types.UPDATE_USER_COMPLAINT:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_USER_COMPLAINT:
            return {
                ...state,
                userComplaint: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default userComplaintReducer;
