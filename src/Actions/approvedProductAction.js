import * as types from '../Constants/index';
import axios from 'axios';

const getApps = (apps) => ({
    type : types.GET_APPS,
    payload : apps,
});

const appAdded = () => ({ 
    type : types.ADD_APP,
});

const appDeleted = () => ({
    type : types.DELETE_APP,
})

const getApp = (app) => ({
    type : types.GET_SINGLE_APP,
    payload: app,
})

const appUpdated = () => ({
    type : types.UPDATE_APP,
});

// get all categoryes
export const loadApps = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/approved-product`)
        .then((res) => {
            // console.log("reponse categoryes:", res);
            dispatch(getApps(res.data))
        })
        .catch((error) => {
            // console.log(error);
        })
    };
};

// delete admin by id
export const deleteApp = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/approved-product/${id}`)
        .then((res) => {
            // console.log("delete response :", res);
            dispatch(appDeleted(res.data));
            dispatch(loadApps());
        })
        .catch((error) => {
            // console.log(error);
        })
    };
};

// add admin
export const addApp = (app) => {
    console.log(app,"function.")
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/approved-product`, app)
        .then((res) => {
            // console.log("added amenities response :", res);
            dispatch(appAdded(res.data));
            dispatch(loadApps());
        }) 
        .catch((error) => {
            // console.log(error);
        })
    };
};

// find admin by id
export const getSingleApp = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/approved-product/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getApp(res.data));
        })
        .catch((error) => {
            console.log("eroooooooo",error); 
        })
    };
}; 
 
// update by admin
export const updateApp = (app, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/approved-product/${id}`, app)
        .then((res) => {
            // console.log("updated admin response :", res);
            dispatch(appUpdated());
            dispatch(loadApps());
        })
        .catch((error) => {
            // console.log(error);
        })
    };
}; 