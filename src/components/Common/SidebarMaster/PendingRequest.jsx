import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadPendingCategorys } from '../../../Actions/pendingCategoryAction';
import { loadPendingProducts } from '../../../Actions/pendingProductAction';
import { loadPendingSubCategorys } from '../../../Actions/pendingSubCategoryAction';

const PendingRequest = () => {
    const [value, setValue] = useState('none');
    const toggle = (data) => {
        if (value === 'none') {
            setValue('block')
        }
        else {
            setValue('none');
        } 
    }

    // COUNT START
    let dispatch = useDispatch();
    const { pendingCatrorys } = useSelector(state => state.pendingCategoryData);
    const totalpendingCatrorys = pendingCatrorys.length;
    useEffect(() => {
        dispatch(loadPendingCategorys());
    }, []);

    const { pendingSubCatrorys } = useSelector(state => state.pendingSubCategoryData);
    const totalpendingSubCatrorys = pendingSubCatrorys.length;
    useEffect(() => {
        dispatch(loadPendingSubCategorys());
    }, []);

    const { pendingProducts } = useSelector(state => state.pendingProductData);
    const totalpendingProducts = pendingProducts.length;
    useEffect(() => {
        dispatch(loadPendingProducts());
    }, []);
    // LOAD ACTIONS ENDS


    return (
        <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic" onClick={() => toggle(value)}>
                <i className="icon-head menu-icon"></i>
                <span className="menu-title">Pending Request</span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic" style={{ display: value }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Product/Pending">Pending Product &nbsp;<span className='count'>({totalpendingProducts})</span></Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default PendingRequest