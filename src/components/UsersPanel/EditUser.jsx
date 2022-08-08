import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadCitys, updateCity } from '../../Actions/cityAction';
import { getSingleUser, updateUser } from '../../Actions/usersAction';

const EditUser = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        city: "",
        username: "",
        email: "",
        password: "",
        fullName: "",
        phone: "",
        status: "",
    });
    const {
        city,
        username,
        email,
        fullName,
        phone,
        status,
    } = state;

    // for validation errors
    const [error, setError] = useState("");
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    const { id } = useParams();

    // LOAD ACTIONS
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);
    // LOAD ACTIONS ENDS

    // fetch single taxlist
    const { user } = useSelector((state) => state.usersData);
    useEffect(() => {
        dispatch(getSingleUser(id))
    }, [])
    useEffect(() => {
        setState({ ...user })
    }, [user])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !email ||
            !fullName ||
            !status ||
            !phone
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateUser(state, id));
            setError("");
            navigate("/Users")
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/Users");
        }
    };
    return (
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit User</h4>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Select City</label>
                                        <div class="col-sm-9">
                                            <select name="city" id="" className="form-control" onChange={onChangeHandler} value={city || ""}>
                                                <option value="">Select City</option>

                                                {citys.map((val) => {
                                                    return <option value={val.id}>{val.city_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Full Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="fullName" onChange={onChangeHandler} placeholder="Full Name" value={fullName || ""} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">User Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="email" onChange={onChangeHandler} placeholder="Email" value={email || ""} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="phone" onChange={onChangeHandler} placeholder="Phone" value={phone || ""} />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                        <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={status || ""}>
                                            <option value="">Select</option>
                                            <option value="1">Active</option>
                                            <option value="0">InActive</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/Users" class="btn btn-light">Cancel</Link>
                                <button class="btn btn-primary mr-2 ml-3" onClick={handleSubmit}>Submit</button>
                                {/* Snackbar */}
                                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                        {alert.content}
                                    </Alert>
                                </Snackbar>
                            </Stack>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUser