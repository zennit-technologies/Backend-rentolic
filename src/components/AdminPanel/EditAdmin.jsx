import React, { useEffect, useState } from 'react'
import { getSingleAdmin, updateAdmin } from '../../Actions/adminAction';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditAdmin = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        admin_name: "",
        admin_email: "",
        admin_password: "",
        admin_phone: "",
        status: "1"
    });
    const {
        admin_name,
        admin_email,
        admin_password,
        admin_phone,
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

    // fetch single taxlist
    const { admin } = useSelector((state) => state.adminData);
    useEffect(() => {
        dispatch(getSingleAdmin(id))
    }, [])
    useEffect(() => {
        setState({ ...admin })
    }, [admin])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !admin_name ||
            !admin_email ||
            !admin_password ||
            !admin_phone
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateAdmin(state, id));
            setError("");
            navigate("/admin")
        }
    };


    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/admin");
        }
    };
    return (
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit Admin</h4>
                            <p className="card-description">
                                Personal info
                            </p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Admin Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" name='admin_name' className="form-control" onChange={onChangeHandler} placeholder="Admin Name" value={admin_name || ""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Admin Email</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="admin_email" className="form-control" onChange={onChangeHandler} placeholder="Admin Email" value={admin_email || ""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Admin Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="admin_phone" className="form-control" onChange={onChangeHandler} placeholder="Admin Phone" value={admin_phone || ""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/admin" class="btn btn-light">Cancel</Link>
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

export default EditAdmin