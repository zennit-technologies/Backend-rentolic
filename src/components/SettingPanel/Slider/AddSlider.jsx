import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { toUnitless } from '@mui/material/styles/cssUtils';
import { addSlider } from '../../../Actions/sliderAction';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddSlider = () => {

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    // This code is used for file upload
    const [file, setFile] = useState();

    const [state, setState] = useState({
        content: "",
        title: "",
        status: "",
        image: "",
    });

    const [error, setError] = useState("");

    const {
        title,
        content,
        status,
        image,
    } = state;
    console.log(state)

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // Saving files
    const fileHandler = (e) => {
        const dat = e.target.files[0];
        setFile(dat);
        state.image = dat;
    }

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("image", file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
     if (!status) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Status !", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/slider`, formData, config)
                .then(response => {
                    // console.log(response);
                    state.image = response.data.image;
                    // Green Snackbar
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    setError("");
                    dispatch(addSlider(state));
                    setError("");
                }).catch(error)
            {
                console.log(error);
            }
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/slider");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Slider</h4>

                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Slider Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="image" className="form-control" onChange={fileHandler} />
                                        <p>Recommended Image Size (1350px X 500px)</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Link</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="title" className="form-control" onChange={onChangeHandler} placeholder="Title" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                    <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler}>
                                        <option value="">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/slider" class="btn btn-light">Cancel</Link>
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

export default AddSlider