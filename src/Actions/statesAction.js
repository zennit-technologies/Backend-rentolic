import * as types from '../Constants/index';
import axios from 'axios';

const getStates = (states) => ({
    type : types.GET_STATES,
    payload : states,
});

// get all categoryes
export const loadStates = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/states`)
        .then((res) => {
            console.log("reponse states:", res);
            dispatch(getStates(res.data))
        })
        .catch((error) => {
            console.log(error);
        })
    };
};