import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PendingRequest from './PendingRequest'
import { loadPendingProducts } from '../../../Actions/pendingProductAction'
import { useDispatch, useSelector } from 'react-redux'
import { loadPendingCategorys } from '../../../Actions/pendingCategoryAction'
import { loadPendingSubCategorys } from '../../../Actions/pendingSubCategoryAction'
import { loadPendingCitys } from '../../../Actions/PendingCityAction'

const Sidebar = () => {
    const [accord, setAccord] = useState(1);
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


    const { pendingCitys } = useSelector(state => state.pendingCityData);
    const totalpendingCitys = pendingCitys.length;
    useEffect(() => {
        dispatch(loadPendingCitys());
    }, []);
    // LOAD ACTIONS ENDS
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>

                {/* ADMIN */}
                <li className="nav-item" >
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic" onClick={() => { setAccord(1) }}>
                        <i className="icon-head menu-icon"></i>
                        <span className="menu-title">Admin</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 1 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">List Admin</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* ADMIN */}


                {/* SUB CATEGORY */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(2) }}>
                        <i className="icon-layout menu-icon"></i>
                        <span className="menu-title">Renting </span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 2 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Category">
                                    <span className="menu-title">Category</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/Sub-Category">
                                    <span className="menu-title">Sub Category</span>
                                </Link>
                            </li>

                            {/*  */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/City">
                                    <span className="menu-title">City</span>
                                </Link>
                            </li>
                            {/*  */}

                            <li className="nav-item">
                                <Link className="nav-link" to="/Products">
                                    <span className="menu-title">Products</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* SUB CATEGORY */}

                {/* PENDING REQUEST */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(3) }}>
                        <i className="icon-head menu-icon"></i>
                        <span className="menu-title">Pending Request</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 3 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Category/Pending">Pending Category &nbsp;<span className='count'>({totalpendingCatrorys})</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Sub-Category/pending">Pending Sub Category &nbsp;<span className='count'>({totalpendingSubCatrorys})</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Product/Pending">Pending Product &nbsp;<span className='count'>({totalpendingProducts})</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/City/Pending">Pending City &nbsp;<span className='count'>({totalpendingCitys})</span></Link>
                            </li>


                        </ul>
                    </div>
                </li>
                {/* PENDING REQUEST END */}

                {/* REPORTING */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(4) }}>
                        <i className="icon-bar-graph menu-icon"></i>
                        <span className="menu-title">Report & Charts</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 4 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/product-views-report">Products Report</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* REPORTING */}

                <li className="nav-item">
                    <Link className="nav-link" to="/Users">
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Users List</span>
                    </Link>
                </li>

                {/* ADS */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(5) }}>
                        <i className="icon-head menu-icon"></i>
                        <span className="menu-title">Ads</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 5 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/ads">Category Ads</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/slider">Slider Ads</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sub-category-ads">Sub Category Ads</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* ADS */}

                {/* BLOG */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(6) }}>
                        <i className="icon-layout menu-icon"></i>
                        <span className="menu-title">Blogs</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 6 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Blogs">List Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Blog/create">Add Blog</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* BLOG END */}

                <li className="nav-item">
                    <Link className="nav-link" to="/Premium-verified">
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Homepage Review List</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/review-product">
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Product Review List</span>
                    </Link>
                </li>

                {/* SETTING */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(7) }}>
                        <i className="icon-layout menu-icon"></i>
                        <span className="menu-title">Settings</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 7 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Admin/contact-us-form">Contact us Form</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/slider">Slider</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/Admin/about-us">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Admin/Contact-Us/Edit/1">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Admin/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Admin/terms-condition">Terms & Condition</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* SETTING END */}

                {/* SETTING */}
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setAccord(8) }}>
                        <i className="icon-layout menu-icon"></i>
                        <span className="menu-title">Pending Products</span>
                        <i className="menu-arrow"></i>
                    </a>

                    <div className="collapse" id="ui-basic" style={{ display: accord === 8 ? 'block' : 'none' }}>
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/approved-products-list">Approved Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/decline-products-list">Decline Products</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                {/* SETTING END */}
            </ul>
        </nav>
    )
}

export default Sidebar