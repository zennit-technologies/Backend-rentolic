import * as types from '../Constants/index';
import axios from 'axios';

const getAdmins = (admins) => ({
    type : types.GET_ADMINS,
    payload : admins,
});

const adminAdded = () => ({ 
    type : types.ADD_ADMIN,
});

const adminDeleted = () => ({
    type : types.DELETE_ADMIN,
})

const getAdmin = (admin) => ({
    type : types.GET_SINGLE_ADMIN,
    payload: admin,
})

const adminUpdated = () => ({
    type : types.UPDATE_ADMIN,
});

// get all categoryes
export const loadAdmins = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/admins`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getAdmins(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteAdmin = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/admins/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(adminDeleted(res.data));
            dispatch(loadAdmins());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// add admin
export const addAdmin = (admin) => {
    console.log(admin,"function.")
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/admins`, admin)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(adminAdded(res.data));
            dispatch(loadAdmins());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleAdmin = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/admins/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getAdmin(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateAdmin = (admin, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/admins/${id}`, admin)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(adminUpdated());
            dispatch(loadAdmins());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};