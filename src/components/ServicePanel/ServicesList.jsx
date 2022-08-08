import React from 'react'
import { Link } from 'react-router-dom'

const ServicesList = () => {
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Booking List <small>Dashboard</small></h4>
                        {/* <p className="card-description">
                        Add className <code>.table-striped</code>
                    </p> */}
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            City
                                        </th>
                                        <th>
                                            Service Name
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            Delhi
                                        </td>
                                        <td>
                                            Car Cleaning
                                        </td>
                                       
                                        <td>
                                            2/4/2022
                                        </td>
                                        <td>
                                            <label class="badge badge-info">Pending</label>
                                        </td>
                                        <td>
                                            <Link to="/" class="action-button badge badge-success">Edit</Link>
                                            <Link to="/" class="action-button badge badge-danger">Delete</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            2
                                        </td>
                                        <td>
                                            Mumbai
                                        </td>
                                        <td>
                                            Ac Repair
                                        </td>
                                       
                                        <td>
                                            2/4/2022
                                        </td>
                                        <td>
                                            <label class="badge badge-info">Pending</label>
                                        </td>
                                        <td>
                                            <Link to="/" class="action-button badge badge-success">Edit</Link>
                                            <Link to="/" class="action-button badge badge-danger">Delete</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesList