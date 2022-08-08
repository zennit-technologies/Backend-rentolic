import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { addPrivacy } from '../../../Actions/privacyAction';
import { addAbout } from '../../../Actions/aboutUsAction';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddAboutPanel = () => {

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        title: "",
        about_us: "",
    });

    const [error, setError] = useState("");

    const {
        title,
        about_us,
    } = state;
    console.log(state)

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Content !", });
        }
        else if (!about_us) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Content !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Added Successfully", });
            setError("");
            dispatch(addAbout(state));
            setError("");
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/Admin/about-us");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create About Us</h4>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input name="title" type="text" placeholder='Title' className="form-control" onChange={onChangeHandler}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">About us</label>
                                    <div className="col-sm-10">
                                        <textarea name="about_us" id="" cols="30" rows="10" placeholder='description' className="form-control" onChange={onChangeHandler}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/Admin/privacy-policy" class="btn btn-light">Cancel</Link>
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

export default AddAboutPanel