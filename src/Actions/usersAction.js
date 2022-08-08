import * as types from '../Constants/index';
import axios from 'axios';

const getUsers = (users) => ({
    type : types.GET_USERS,
    payload : users,
});

const userAdded = () => ({ 
    type : types.ADD_USER,
});

const userDeleted = () => ({
    type : types.DELETE_USER,
})

const getUser = (user) => ({
    type : types.GET_SINGLE_USER,
    payload: user,
})

const userUpdated = () => ({
    type : types.UPDATE_USER,
});

// get all categoryes 
export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/users`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getUsers(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteUsers = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/users/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(userDeleted(res.data));
            dispatch(loadUsers());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addUser = (users) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/users`, users)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(userAdded(res.data));
            dispatch(loadUsers());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleUser = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/users/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getUser(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateUser = (user, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/users/${id}`, user)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(userUpdated());
            dispatch(loadUsers());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};