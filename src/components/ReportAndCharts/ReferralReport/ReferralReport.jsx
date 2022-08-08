import React from 'react'
import { Link } from 'react-router-dom'

const ReferralReport = () => {
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Referral Report List <small>Dashboard</small></h4>
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
                                            User Name
                                        </th>
                                        <th>
                                            Referred Person
                                        </th>
                                        <th>
                                            Total Member Refer
                                        </th>
                                        <th>
                                            Refer Amount
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

export default ReferralReport