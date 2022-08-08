import * as types from '../Constants/index';
import axios from 'axios';

const getCitys = (citys) => ({
    type : types.GET_CITYS,
    payload : citys,
});

const cityAdded = () => ({ 
    type : types.ADD_CITY,
});

const cityDeleted = () => ({
    type : types.DELETE_CITY,
})

const getCity = (city) => ({
    type : types.GET_SINGLE_CITY,
    payload: city,
})

const cityUpdated = () => ({
    type : types.UPDATE_CITY,
});

// get all categoryes
export const loadCitys = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/city`)
        .then((res) => {
            console.log("reponse categoryes:", res);
            dispatch(getCitys(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// delete admin by id
export const deleteCity = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/city/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(cityDeleted(res.data));
            dispatch(loadCitys());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addCity = (city) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/city`, city)
        .then((res) => {
            console.log("added amenities response :", res);
            dispatch(cityAdded(res.data));
            dispatch(loadCitys());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleCity = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/city/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getCity(res.data));
        })
        .catch((error) => {
            console.log(error);
        }) 
    };
};
 
// update by admin
export const updateCity = (city, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/city/${id}`, city)
        .then((res) => {
            console.log("updated admin response :", res);
            dispatch(cityUpdated());
            dispatch(loadCitys());
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};