import * as types from '../Constants/index';
import axios from 'axios';
import { loadPendingProducts } from './pendingProductAction';

const getProducts = (products) => ({
    type : types.GET_PRODUCTS,
    payload : products,
});

const productAdded = () => ({ 
    type : types.ADD_PRODUCT,
});

const productDeleted = () => ({
    type : types.DELETE_PRODUCT,
})

const getProduct = (product) => ({
    type : types.GET_SINGLE_PRODUCT,
    payload: product,
})

const productUpdated = () => ({
    type : types.UPDATE_PRODUCT,
});

// get all categoryes
export const loadProducts = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/products`)
        .then((res) => {
            console.log("reponse products:", res);
            dispatch(getProducts(res.data))
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};

// delete admin by id
export const deleteProduct = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/products/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(productDeleted(res.data));
            dispatch(loadProducts());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addProduct = (product) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/products`, product)
        .then((res) => {
            console.log("added products response :", res);
            dispatch(productAdded(res.data));
            dispatch(loadProducts());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// find admin by id
export const getSingleProduct = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/products/${id}`)
        .then((res) => {
            console.log("single products response :", res);
            dispatch(getProduct(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateProduct = (product, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/products/${id}`, product)
        .then((res) => {
            console.log("updated products response :", res);
            dispatch(productUpdated());
            dispatch(loadProducts());
            dispatch(loadPendingProducts());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};