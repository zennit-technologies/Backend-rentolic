import * as types from '../Constants/index';
import axios from 'axios';

const getCategoryes = (categoryes) => ({
    type : types.GET_CATEGORYS,
    payload : categoryes,
});

const categoryAdded = () => ({ 
    type : types.ADD_CATEGORY,
});

const categoryDeleted = () => ({
    type : types.DELETE_CATEGORY,
})

const getCategory = (category) => ({
    type : types.GET_SINGLE_CATEGORY,
    payload: category,
})

const categoryUpdated = () => ({
    type : types.UPDATE_CATEGORY,
});

// get all categoryes
export const loadCategoryes = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/category`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getCategoryes(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteCategory = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/category/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(categoryDeleted(res.data));
            dispatch(loadCategoryes());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addCategory = (category) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/category`, category)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(categoryAdded(res.data));
            dispatch(loadCategoryes());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleCategory = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/category/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getCategory(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateCategory = (category, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/category/${id}`, category)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(categoryUpdated());
            dispatch(loadCategoryes());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};