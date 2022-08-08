import * as types from '../Constants/index';
import axios from 'axios';

const getReviews = (reviews) => ({
    type : types.GET_REVIEW,
    payload : reviews,
});

const reviewAdded = () => ({  
    type : types.ADD_REVIEW,
});

const reviewDeleted = () => ({
    type : types.DELETE_REVIEW,
})

const getReview = (review) => ({
    type : types.GET_SINGLE_REVIEW,
    payload: review,
})

const reviewUpdated = () => ({
    type : types.UPDATE_REVIEW,
});

// get all categoryes
export const loadReview = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/review-admin`)
        .then((res) => {
            console.log("reponse products:", res);
            dispatch(getReviews(res.data))
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};

// delete admin by id
export const deleteReview = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/review-admin/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(reviewDeleted(res.data));
            dispatch(loadReview());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addReview = (review) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/review-admin`, review)
        .then((res) => {
            console.log("added reviews response :", res);
            dispatch(reviewAdded(res.data));
            dispatch(loadReview());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleReview = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/review-admin/${id}`)
        .then((res) => {
            console.log("single review response :", res);
            dispatch(getReview(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateReview= (review, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/review-admin/${id}`, review)
        .then((res) => {
            console.log("updated reviews response :", res);
            dispatch(reviewUpdated());
            dispatch(loadReview());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};