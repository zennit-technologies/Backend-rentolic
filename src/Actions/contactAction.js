import * as types from '../Constants/index';
import axios from 'axios';

const getContacts = (contacts) => ({
    type : types.GET_CONTACTS,
    payload : contacts,
});

const getContact = (contact) => ({
    type : types.GET_SINGLE_CONTACT,
    payload: contact,
})

const contactUpdated = () => ({
    type : types.UPDATE_CONTACT,
});

// get all categoryes
export const loadContacts = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/contactus`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getContacts(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleContact = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/contactus/${id}`)
        .then((res) => {
            console.log("single contactus response :", res);
            dispatch(getContact(res.data));
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};
 
// update by admin
export const updateContact = (contact, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/contactus/${id}`, contact)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(contactUpdated());
            dispatch(loadContacts());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};