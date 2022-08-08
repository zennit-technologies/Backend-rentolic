import * as types from '../Constants/index';
import axios from 'axios';

const getSliders = (sliders) => ({
    type : types.GET_SLIDERS,
    payload : sliders,
});

const sliderAdded = () => ({ 
    type : types.ADD_SLIDER,
});

const sliderDeleted = () => ({
    type : types.DELETE_SLIDER,
})

const getSlider = (slider) => ({
    type : types.GET_SINGLE_SLIDER,
    payload: slider,
})

const sliderUpdated = () => ({
    type : types.UPDATE_SLIDER,
});

// get all categoryes
export const loadSliders = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/slider`)
        .then((res) => {
            console.log("reponse products:", res);
            dispatch(getSliders(res.data))
        })
        .catch((error) => {
            console.log(error); 
        })
    };
};

// delete admin by id
export const deleteSlider = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_IPURL}/api/admin/slider/${id}`)
        .then((res) => {
            console.log("delete response :", res);
            dispatch(sliderDeleted(res.data));
            dispatch(loadSliders());
        })
        .catch((error) => {
            console.log(error);
        })
    };
};

// add admin
export const addSlider = (slider) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_IPURL}/api/admin/slider`, slider)
        .then((res) => {
            console.log("added products response :", res);
            dispatch(sliderAdded(res.data));
            dispatch(loadSliders());
        }) 
        .catch((error) => {
            console.log(error);
        })
    };
};

// find admin by id
export const getSingleSlider = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/slider/${id}`)
        .then((res) => {
            console.log("single products response :", res);
            dispatch(getSlider(res.data));
        })
        .catch((error) => {
            console.log(error);
        })
    };
};
 
// update by admin
export const updateSlider = (slider, id) => {
    return function (dispatch) {
        axios.patch(`${process.env.REACT_APP_IPURL}/api/admin/slider/${id}`, slider)
        .then((res) => {
            console.log("updated products response :", res);
            dispatch(sliderUpdated());
            dispatch(loadSliders());
        })
        .catch((error) => {
            console.log(error);
        })
    };
}; 