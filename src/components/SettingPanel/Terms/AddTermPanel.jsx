import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { addTerm } from '../../../Actions/termsAction';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddTermPanel = () => {

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        title: "",
        content: "",
        status: "",
    });

    const [error, setError] = useState("");

    const {
        title,
        content,
        status,
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
            setAlert({ sev: "error", content: "Please Fill Title !", });
        }
        else if (!content) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Content !", });
        }
        else if (!status) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Status !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Added Successfully", });
            setError("");
            dispatch(addTerm(state));
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
            navigate("/Admin/terms-condition");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Terms & Condition</h4>

                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Title</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="title" className="form-control" onChange={onChangeHandler} placeholder="Title" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Description</label>
                                    <div className="col-sm-9">
                                        <textarea name="content" id="" cols="30" rows="10" placeholder='description' className="form-control" onChange={onChangeHandler}></textarea>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                    <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler}>
                                        <option value="">Select status</option>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/Admin/terms-condition" class="btn btn-light">Cancel</Link>
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

export default AddTermPanel