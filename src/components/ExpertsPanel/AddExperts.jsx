import React from 'react'



const AddExperts = () => {
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Expert</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Expert Name</label>
                                    <div className="col-sm-9">
                                        <input type="Text" className="form-control" placeholder='Expert Name' />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Expert Email</label>
                                    <div className="col-sm-9">
                                        <input type="Text" className="form-control" placeholder='Expert Email' />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Select Service</label>
                                    <select name="" id="" className="col-sm-8">
                                        <option value="">Select Service</option>
                                        <option value="">Service 1</option>
                                        <option value="">Service 2</option>
                                    </select>
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

export default AddExperts