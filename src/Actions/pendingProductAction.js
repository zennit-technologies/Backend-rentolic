import * as types from '../Constants/index';
import axios from 'axios';

const getPendingProducts = (pendingProducts) => ({
    type: types.GET_PENDING_PRODUCT,
    payload: pendingProducts,
});

// get all categoryes
export const loadPendingProducts = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/pending-product`)
            .then((res) => {
                console.log("reponse products:", res);
                dispatch(getPendingProducts(res.data))
            })
            .catch((error) => { 
                console.log(error);
            })
    };
};
