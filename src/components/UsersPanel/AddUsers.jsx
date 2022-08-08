import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadCitys } from '../../Actions/cityAction';
import { addUser } from '../../Actions/usersAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddUsers = () => {
    let dispatch = useDispatch();
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);

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
        status: "1",
    });

    const {
        city,
        username,
        email,
        password,
        fullName,
        phone,
    } = state;

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!city) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select City !", });
        }
        else if (!username) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select username !", });
        }
        else if (!email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill email !", });
        }
        else if (!password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill password !", });
        }
        else if (!fullName) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Day full Name !", });
        }
        else if (!phone) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Hour phone !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Added Successfully", });
            dispatch(addUser(state));
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
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New User</h4>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Select City</label>
                                    <div class="col-sm-9">
                                        <select name="city" id="" className="form-control" onChange={onChangeHandler}>
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
                                    <label className="col-sm-3 col-form-label">Username</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="username" onChange={onChangeHandler} placeholder="Username" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Full Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="fullName" onChange={onChangeHandler} placeholder="Full Name" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">User Email</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="email" onChange={onChangeHandler} placeholder="Email" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">User Password</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="password" onChange={onChangeHandler} placeholder="Password" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Phone</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="phone" onChange={onChangeHandler} placeholder="Phone" />
                                    </div>
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
    )
}

export default AddUsers