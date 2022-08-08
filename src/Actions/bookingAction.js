import * as types from '../Constants/index';
import axios from 'axios';

const getBookings = (bookings) => ({
    type : types.GET_BOOKINGS,
    payload : bookings,
});

const bookingAdded = () => ({ 
    type : types.ADD_BOOKING,
});

const bookingDeleted = () => ({
    type : types.DELETE_BOOKING,
})

const getBooking = (booking) => ({
    type : types.GET_SINGLE_BOOKING,
    payload: booking,
})

const bookingUpdated = () => ({
    type : types.UPDATE_BOOKING,
});

// get all data
export const loadBookings = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/admins`)
        .then((res) => {
            console.log("reponse getBookings:", res);
            dispatch(getBookings(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteBooking = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/admins/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(bookingDeleted(res.data));
            dispatch(loadBookings());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addBooking = (booking) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/admins`, booking)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(bookingAdded(res.data));
            dispatch(loadBookings());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleBooking = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/admins/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getBooking(res.data));
        })
        .catch((error) => { 
            console.log(error);
        })
    };
};
 
// update by admin
export const updateBooking = (booking, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/admins/${id}`, booking)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(bookingUpdated());
            dispatch(loadBookings());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};