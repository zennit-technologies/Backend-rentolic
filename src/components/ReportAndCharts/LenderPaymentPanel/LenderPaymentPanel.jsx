import React from 'react'
import { Link } from 'react-router-dom'

const LenderPaymentPanel = () => {
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Lender Payment List <small>Dashboard</small></h4>
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
                                            Lender Name
                                        </th>
                                        <th>
                                            Lender Email
                                        </th>
                                        <th>
                                            Lender Phone
                                        </th>
                                        <th>
                                            Amount
                                        </th>
                                        <th>
                                            Payment Mode
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

export default LenderPaymentPanel