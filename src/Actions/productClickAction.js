import * as types from '../Constants/index';
import axios from 'axios';

const getProductClicks = (productClicks) => ({
    type : types.GET_PRODUCT_CLICKS,
    payload : productClicks,
});

const productClickAdded = () => ({ 
    type : types.ADD_PRODUCT_CLICK,
});

const productClickDeleted = () => ({
    type : types.DELETE_PRODUCT_CLICK,
})

const getProductClick = (productClick) => ({
    type : types.GET_SINGLE_PRODUCT_CLICK,
    payload: productClick,
})

const productClickUpdated = () => ({
    type : types.UPDATE_PRODUCT_CLICK,
});

// get all categoryes
export const loadProductClicks = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/product_click`)
        .then((res) => {
            console.log("THIS IS DATAAAAAA:", res);
            dispatch(getProductClicks(res.data))
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};

// delete admin by id
export const deleteProductClick = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/product_click/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(productClickDeleted(res.data));
            dispatch(loadProductClicks());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addProductClick = (productClick) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/product_click`, productClick)
        .then((res) => {
            console.log("added products response :", res);
            dispatch(productClickAdded(res.data));
            dispatch(loadProductClicks());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleProductClick = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/product_click/${id}`)
        .then((res) => {
            console.log("single products response :", res);
            dispatch(getProductClick(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateProductClick = (productClick, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/product_click/${id}`, productClick)
        .then((res) => {
            console.log("updated products response :", res);
            dispatch(productClickUpdated());
            dispatch(loadProductClicks());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};