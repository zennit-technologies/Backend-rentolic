import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoryes } from '../../Actions/categoryAction';
import { loadCitys } from '../../Actions/cityAction';
import { loadProducts } from '../../Actions/productAction';
import { loadSubCategoryes } from '../../Actions/SubCategoryAction';
import { loadUsers } from '../../Actions/usersAction';

const MainContent = () => {
    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { categoryes } = useSelector(state => state.categoryData);
    const catrory = categoryes.length;
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    // LOAD ACTIONS ENDS

    // LOAD ACTIONS
    const { users } = useSelector(state => state.usersData);
    const user = users.length;
    useEffect(() => {
        dispatch(loadUsers());
    }, []);
    // LOAD ACTIONS ENDS

    // LOAD ACTIONS
    const { citys } = useSelector(state => state.cityData);
    const city = citys.length;
    useEffect(() => {
        dispatch(loadCitys());
    }, []);
    // LOAD ACTIONS ENDS

    // LOAD ACTIONS
    const { products } = useSelector(state => state.productData);
    const product = products.length;
    useEffect(() => {
        dispatch(loadProducts());
    }, []);
    // LOAD ACTIONS ENDS

    // LOAD ACTIONS
    const { subCategoryes } = useSelector(state => state.subCategoryData);
    const subCategorye = subCategoryes.length;
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);
    // LOAD ACTIONS ENDS

    // Count
    const [weeklyProducts, setWeeklyProduct] = useState([])
    const productCount = weeklyProducts.length;
    useEffect(() => {
        fetch(`${process.env.REACT_APP_IPURL}/api/admin/product_click_count`).then((res) => {
            // console.log(res)
            return res.json()
        })
            .then((res) => {
                // console.log('Success', res)
                setWeeklyProduct(res)
                return res
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    // count end
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin transparent">
                        <div className="row">

                            <div className="col-md-4 mb-4 stretch-card transparent">
                                <div className="card card-light-blue linear-gradient">
                                    <div className="card-body">
                                        <p className="mb-4">Total Users</p>
                                        <p className="fs-30 mb-2">{user}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4 stretch-card transparent">
                                <div className="card card-light-blue linear-gradient">
                                    <div className="card-body">
                                        <p className="mb-4">Category</p>
                                        <p className="fs-30 mb-2">{catrory}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4 stretch-card transparent ">
                                <div className="card card-tale linear-gradient">
                                    <div className="card-body">
                                        <p className="mb-4">Sub Category</p>
                                        <p className="fs-30 mb-2">{subCategorye}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4 stretch-card transparent">
                                <div className="card card-dark-blue linear-gradient">
                                    <div className="card-body">
                                        <p className="mb-4">Total Products</p>
                                        <p className="fs-30 mb-2">{product}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4 stretch-card transparent">
                                <div className="card card-light-danger linear-gradient">
                                    <div className="card-body">
                                        <p className="mb-4">Total Location</p>
                                        <p className="fs-30 mb-2">{city}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4 stretch-card transparent">
                                <div className="card card-light-danger linear-gradient">
                                    <div className="card-body">
                                        <p className="mb-4">Total Views</p>
                                        <p className="fs-30 mb-2">{productCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default MainContent