import * as types from '../Constants/index';
import axios from 'axios';

const getAbouts = (abouts) => ({
    type : types.GET_ABOUTS,
    payload : abouts,
});

const aboutAdded = () => ({ 
    type : types.ADD_ABOUT,
});

const aboutDeleted = () => ({
    type : types.DELETE_ABOUT,
})

const getAbout = (about) => ({
    type : types.GET_SINGLE_ABOUT,
    payload: about,
})

const aboutUpdated = () => ({
    type : types.UPDATE_ABOUT,
});

// get all categoryes
export const loadAbouts = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/about`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getAbouts(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteAbout = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/about/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(aboutDeleted(res.data));
            dispatch(loadAbouts());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// add admin
export const addAbout = (about) => {
    // console.log(admin,"function.")
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/about`, about)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(aboutAdded(res.data));
            dispatch(loadAbouts());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleAbout = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/about/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getAbout(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateAbout = (about, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/about/${id}`, about)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(aboutUpdated());
            dispatch(loadAbouts());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};