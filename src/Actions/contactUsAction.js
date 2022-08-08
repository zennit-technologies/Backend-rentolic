import * as types from '../Constants/index';
import axios from 'axios';

const getContactuss = (contactuss) => ({
    type : types.GET_CONTACTUSS,
    payload : contactuss,
});

const contactusAdded = () => ({  
    type : types.ADD_CONTACTUS,
});

const contactusDeleted = () => ({
    type : types.DELETE_CONTACTUS,
})

const getContactus = (contactus) => ({
    type : types.GET_SINGLE_CONTACTUS,
    payload: contactus
})

const contactusUpdated = () => ({
    type : types.UPDATE_CONTACTUS,
});

// get all categoryes
export const loadContactuss = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/contact`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getContactuss(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteContactus = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/contact/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(contactusDeleted(res.data));
            dispatch(loadContactuss());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addContactus = (contact) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/contact`, contact)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(contactusAdded(res.data));
            dispatch(loadContactuss());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleContactus = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/contact/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getContactus(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateContactus = (contact, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/contact/${id}`, contact)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(contactusUpdated());
            dispatch(loadContactuss());
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};