import * as types from '../Constants/index';
import axios from 'axios';

const getPendingCitys = (pendingCitys) => ({
    type: types.GET_PENDING_CITYS,
    payload: pendingCitys,
});

// get all categoryes
export const loadPendingCitys = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_IPURL}/api/admin/city-pending`)
            .then((res) => {
                console.log("reponse products:", res);
                dispatch(getPendingCitys(res.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
