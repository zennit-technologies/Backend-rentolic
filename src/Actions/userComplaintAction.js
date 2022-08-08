import * as types from '../Constants/index';
import axios from 'axios';

const getUserComplaints = (userComplaints) => ({
    type : types.GET_USER_COMPLAINTS,
    payload : userComplaints,
});

const userComplaintAdded = () => ({ 
    type : types.ADD_USER_COMPLAINT,
});

const userComplaintDeleted = () => ({
    type : types.DELETE_USER_COMPLAINT,
})

const getUserComplaint = (userComplaint) => ({
    type : types.GET_SINGLE_USER_COMPLAINT,
    payload: userComplaint,
})

const userComplaintUpdated = () => ({
    type : types.UPDATE_USER_COMPLAINT,
});

// get all categoryes
export const loadUserComplaints = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/user_complaint`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getUserComplaints(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteUserComplaints = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/user_complaint/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(userComplaintDeleted(res.data));
            dispatch(loadUserComplaints());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addUserComplaint = (userComplaints) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/user_complaint`, userComplaints)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(userComplaintAdded(res.data));
            dispatch(loadUserComplaints());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleUserComplaint = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/user_complaint/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getUserComplaint(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateUserComplaint = (userComplaint, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/user_complaint/${id}`, userComplaint)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(userComplaintUpdated());
            dispatch(loadUserComplaints());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};