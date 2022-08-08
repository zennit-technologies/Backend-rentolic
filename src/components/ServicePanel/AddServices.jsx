import React from 'react'

const AddServices = () => {
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Service</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Select City</label>
                                    <select name="" id="" className="col-sm-8">
                                        <option value="">Select City</option>
                                        <option value="">City 1</option>
                                        <option value="">City 2</option>
                                        <option value="">City 3</option>
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Service Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Amount</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary mr-2">Submit</button>
                        <button class="btn btn-light">Cancel</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddServices