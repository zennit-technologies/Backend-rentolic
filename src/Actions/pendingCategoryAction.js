import * as types from '../Constants/index';
import axios from 'axios';

const getPendingCatrorys = (pendingCatrorys) => ({
    type: types.GET_PENDING_CATEGORY,
    payload: pendingCatrorys,
});

// get all categoryes
export const loadPendingCategorys = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/pending-category`)
            .then((res) => {
                console.log("reponse products:", res);
                dispatch(getPendingCatrorys(res.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
