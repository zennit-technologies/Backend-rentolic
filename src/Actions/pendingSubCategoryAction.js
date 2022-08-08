import * as types from '../Constants/index';
import axios from 'axios';

const getPendingSubCatrorys = (pendingSubCatrorys) => ({
    type: types.GET_PENDING_SUB_CATEGORY,
    payload: pendingSubCatrorys,
});

// get all categoryes
export const loadPendingSubCategorys = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/pending-sub-category`)
            .then((res) => {
                console.log("reponse products:", res);
                dispatch(getPendingSubCatrorys(res.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
