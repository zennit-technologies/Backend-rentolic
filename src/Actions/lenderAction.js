import * as types from '../Constants/index';
import axios from 'axios';

const getLenderss = (lenders) => ({
    type : types.GET_LENDER,
    payload : lenders,
}); 

const lenderAdded = () => ({ 
    type : types.ADD_LENDER,
});

const lenderDeleted = () => ({
    type : types.DELETE_LENDER,
})

const getLender = (lender) => ({
    type : types.GET_SINGLE_LENDER,
    payload: lender,
})

const lenderUpdated = () => ({
    type : types.UPDATE_LENDER,
});
 
// get all categoryes
export const loadLanders = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/lender`)
        .then((res) => {
            console.log("reponse get data..:", res);
            dispatch(getLenderss(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add lender
export const addLender = (lender) => {
    console.log(lender,"functionlender........")
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/lender`, lender)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(lenderAdded(res.data));
           //dispatch(loadAdmins());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleLender = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/lender/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getLender(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateLender = (lender, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/lender/${id}`, lender)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(lenderUpdated());
            dispatch(loadLanders());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteAdmin = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/lender/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(lenderDeleted(res.data));
            dispatch(loadLanders());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
 
