import ReactPaginate from 'react-paginate';
import { loadProductClicks } from '../../Actions/productClickAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProductViewReportPanel = () => {
    let dispatch = useDispatch();
    const [weeklyProducts, setWeeklyProduct] = useState([])

    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_IPURL}/api/admin/product_click`).then((res) => {
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
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Product Views <small>Dashboard</small></h4>
                        <button className="action-button badge badge-primary">
                            {/* <FontAwesomeIcon icon="download" /> */}
                            {/* <ExportCSV csvData={productClicks} fileName={fileName} /> */}
                        </button>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Product Name
                                        </th>
                                        <th>
                                            Total Views
                                        </th>
                                        {/* <th>
                                            Lender Details
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Status
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        weeklyProducts.map(productClick => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {productClick.id}
                                                    </td>
                                                    <td>
                                                        {productClick.product_name}
                                                    </td>
                                                    <td>
                                                        {productClick.count}
                                                    </td>
                                                    {/* <td>
                                                        {productClick.category_name}
                                                    </td>
                                                    <td className='full_details'>
                                                        <li>{productClick.lender_name}</li>
                                                        <li>{productClick.lender_email}</li>
                                                        <li>{productClick.lender_phone}</li>
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductViewReportPanel