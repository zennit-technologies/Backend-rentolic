import * as types from '../Constants/index';
import axios from 'axios';

const getTestis = (testis) => ({
    type : types.GET_TESTIS,
    payload : testis,
});

const testiAdded = () => ({ 
    type : types.ADD_TESTI,
});

const testiDeleted = () => ({
    type : types.DELETE_TESTI,
})

const getTesti = (testi) => ({
    type : types.GET_SINGLE_TESTI,
    payload: testi,
})

const testiUpdated = () => ({
    type : types.UPDATE_TESTI,
});

// get all categoryes 
export const loadTestis = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/testimonials`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getTestis(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteTestis = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/testimonials/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(testiDeleted(res.data));
            dispatch(loadTestis());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addTesti = (testis) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/testimonials`, testis)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(testiAdded(res.data));
            dispatch(loadTestis());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleTesti = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/testimonials/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getTesti(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateTesti = (testi, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/testimonials/${id}`, testi)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(testiUpdated());
            dispatch(loadTestis());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};