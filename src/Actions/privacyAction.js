import * as types from '../Constants/index';
import axios from 'axios';

const getPrivacys = (privacys) => ({
    type : types.GET_PRIVACYS,
    payload : privacys,
});

const privacyAdded = () => ({ 
    type : types.ADD_PRIVACY,
});

const privacyDeleted = () => ({
    type : types.DELETE_PRIVACY,
})

const getPrivacy = (privacy) => ({
    type : types.GET_SINGLE_PRIVACY,
    payload: privacy,
})

const privacyUpdated = () => ({
    type : types.UPDATE_PRIVACY,
});

// get all categoryes
export const loadPrivacys = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/privacy_policy`)
        .then((res) => {
            console.log("reponse products:", res);
            dispatch(getPrivacys(res.data))
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};

// delete admin by id
export const deletePrivacy = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/privacy_policy/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(privacyDeleted(res.data));
            dispatch(loadPrivacys());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addPrivacy = (privacy) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/privacy_policy`, privacy)
        .then((res) => {
            console.log("added products response :", res);
            dispatch(privacyAdded(res.data));
            dispatch(loadPrivacys());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSinglePrivacy = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/privacy_policy/${id}`)
        .then((res) => {
            console.log("single products response :", res);
            dispatch(getPrivacy(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updatePrivacy = (privacy, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/privacy_policy/${id}`, privacy)
        .then((res) => {
            console.log("updated products response :", res);
            dispatch(privacyUpdated());
            dispatch(loadPrivacys());
        })
        .catch((error) => {
            console.log(error);
        })
    };
}; 