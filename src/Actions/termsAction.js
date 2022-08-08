import * as types from '../Constants/index';
import axios from 'axios';

const getTerms = (terms) => ({
    type : types.GET_TERMS,
    payload : terms,
}); 

const termAdded = () => ({ 
    type : types.ADD_TERM,
});

const termDeleted = () => ({
    type : types.DELETE_TERM,
})

const getTerm = (term) => ({
    type : types.GET_SINGLE_TERM,
    payload: term,
})

const termUpdated = () => ({
    type : types.UPDATE_TERM,
});
 
// get all categoryes
export const loadTerms = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/terms_condition`)
        .then((res) => {
            console.log("reponse get data..:", res);
            dispatch(getTerms(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add lender
export const addTerm = (terms) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/terms_condition`, terms)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(termAdded(res.data));
           dispatch(loadTerms());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleTerm = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/terms_condition/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getTerm(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateTerm = (term, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/terms_condition/${id}`, term)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(termUpdated());
            dispatch(loadTerms());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id 
export const deleteTerm = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/terms_condition/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(termDeleted(res.data));
            dispatch(loadTerms());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
 
