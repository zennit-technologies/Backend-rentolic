import * as types from '../Constants/index';
import axios from 'axios';

const getSubCategoryes = (subCategoryes) => ({
    type : types.GET_SUB_CATEGORYS,
    payload : subCategoryes,
});

const subCategoryAdded = () => ({ 
    type : types.ADD_SUB_CATEGORY,
});

const subCategoryDeleted = () => ({
    type : types.DELETE_SUB_CATEGORY,
})

const getSubCategory = (subCategory) => ({
    type : types.GET_SINGLE_SUB_CATEGORY,
    payload: subCategory,
})

const subCategoryUpdated = () => ({
    type : types.UPDATE_SUB_CATEGORY,
});

// get all categoryes
export const loadSubCategoryes = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/sub_category`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getSubCategoryes(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteSubCategory = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/sub_category/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(subCategoryDeleted(res.data));
            dispatch(loadSubCategoryes());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addSubCategory = (subCategory) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/sub_category`, subCategory)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(subCategoryAdded(res.data));
            dispatch(loadSubCategoryes());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleSubCategory = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/sub_category/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getSubCategory(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateSubCategory = (subCategory, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/sub_category/${id}`, subCategory)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(subCategoryUpdated());
            dispatch(loadSubCategoryes());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};