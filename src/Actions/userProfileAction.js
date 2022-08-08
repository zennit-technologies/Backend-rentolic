import * as types from '../Constants/index';
import axios from 'axios';

const getUserProfiles = (userProfiles) => ({
    type : types.GET_USER_PROFILES,
    payload : userProfiles,
});

const userProfileAdded = () => ({ 
    type : types.ADD_USER_PROFILE,
});

const userProfileDeleted = () => ({
    type : types.DELETE_USER_PROFILE,
})

const getUserProfile = (userProfile) => ({
    type : types.GET_SINGLE_USER_PROFILE,
    payload: userProfile,
})

const userProfileUpdated = () => ({
    type : types.UPDATE_USER_PROFILE,
});

// get all categoryes
export const loadUserProfiles = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/user_profile`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getUserProfiles(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteUserProfile = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/user_profile/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(userProfileDeleted(res.data));
            dispatch(loadUserProfiles());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addUserProfile = (userProfiles) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/user_profile`, userProfiles)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(userProfileAdded(res.data));
            dispatch(loadUserProfiles());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleUserProfile = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/user_profile/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getUserProfile(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateUserProfile = (userComplaint, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/user_profile/${id}`, userComplaint)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(userProfileUpdated());
            dispatch(loadUserProfiles());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};