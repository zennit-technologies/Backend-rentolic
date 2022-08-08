import * as types from '../Constants/index';
import axios from 'axios';

const getAdSubCategorys = (adsSubCategorys) => ({
    type : types.GET_SUB_CATEGORY_ADS,
    payload : adsSubCategorys,
});

const adSubCategoryAdded = () => ({ 
    type : types.ADD_SUB_CATEGORY_AD,
});

const adSubCategoryDeleted = () => ({
    type : types.DELETE_SUB_CATEGORY_AD,
})

const getAdSubCategory = (adsSubCategory) => ({
    type : types.GET_SINGLE_SUB_CATEGORY_AD,
    payload: adsSubCategory,
})

const adSubCategoryUpdated = () => ({
    type : types.UPDATE_SUB_CATEGORY_AD,
});

// get all categoryes
export const loadAdSubCategorys = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/sub_category_ads`)
        .then((res) => {
            // console.log("reponse categoryes:", res);
            dispatch(getAdSubCategorys(res.data))
        })
        .catch((error) => {
            // console.log(error);
        })
    };
};

// delete admin by id
export const deleteAdSubCategory = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/sub_category_ads/${id}`)
        .then((res) => {
            // console.log("delete response :", res);
            dispatch(adSubCategoryDeleted(res.data));
            dispatch(loadAdSubCategorys());
        })
        .catch((error) => {
            // console.log(error);
        })
    };
};

// add admin
export const addAdSubCategory = (adsSubCategory) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/sub_category_ads`, adsSubCategory)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(adSubCategoryAdded(res.data));
            dispatch(loadAdSubCategorys());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleAdSubCategory = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/sub_category_ads/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getAdSubCategory(res.data));
        })
        .catch((error) => {
            console.log("eroooooooo",error); 
        })
    };
}; 
 
// update by admin
export const updateAdSubCategory = (adsSubCategory, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/sub_category_ads/${id}`, adsSubCategory)
        .then((res) => {
            // console.log("updated admin response :", res);
            dispatch(adSubCategoryUpdated()); 
            dispatch(loadAdSubCategorys());
        })
        .catch((error) => {
            console.log(error);
        })
    };
}; 