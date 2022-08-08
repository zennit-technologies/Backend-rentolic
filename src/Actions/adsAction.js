import * as types from '../Constants/index';
import axios from 'axios';

const getAds = (ads) => ({
    type : types.GET_ADS,
    payload : ads,
});

const adAdded = () => ({ 
    type : types.ADD_AD,
});

const adDeleted = () => ({
    type : types.DELETE_AD,
})

const getAd = (ad) => ({
    type : types.GET_SINGLE_AD,
    payload: ad,
})

const adUpdated = () => ({
    type : types.UPDATE_AD,
});

// get all categoryes
export const loadAds = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/ads`)
        .then((res) => {
            // console.log("reponse categoryes:", res);
            dispatch(getAds(res.data))
        })
        .catch((error) => {
            // console.log(error);
        })
    };
};

// delete admin by id
export const deleteAd = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/ads/${id}`)
        .then((res) => {
            // console.log("delete response :", res);
            dispatch(adDeleted(res.data));
            dispatch(loadAds());
        })
        .catch((error) => {
            // console.log(error);
        })
    };
};

// add admin
export const addAd = (ad) => {
    console.log(ad,"function.")
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/ads`, ad)
        .then((res) => {
            // console.log("added amenities response :", res);
            dispatch(adAdded(res.data));
            dispatch(loadAds());
        }) 
        .catch((error) => {
            // console.log(error);
        })
    };
};

// find admin by id
export const getSingleAd = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/ads/${id}`)
        .then((res) => {
            console.log("single admin response :", res);
            dispatch(getAd(res.data));
        })
        .catch((error) => {
            console.log("eroooooooo",error); 
        })
    };
}; 
 
// update by admin
export const updateAd = (ad, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/ads/${id}`, ad)
        .then((res) => {
            // console.log("updated admin response :", res);
            dispatch(adUpdated()); 
            dispatch(loadAds());
        })
        .catch((error) => {
            console.log(error);
        })
    };
}; 