import { Alert, Snackbar, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminProfile = () => {
  return (
    <>
         <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Admin Profile</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="adName" placeholder='Name' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="subtitle" placeholder='Phone'/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="buttonText" placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Profile Image</label>
                                        <div className="col-sm-9">
                                            <input type="file" name="icon" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/ads" class="btn btn-light">Cancel</Link>
                                <button class="btn btn-primary mr-2 ml-3">Submit</button>
                                {/* Snackbar */}
                                {/* <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                        {alert.content}
                                    </Alert>
                                </Snackbar> */}
                            </Stack>

                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AdminProfile