import React, { useEffect, useState } from 'react'
// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTesti } from '../../Actions/testiAction';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddTestimonials = () => {
    // This code is used for file upload
    const [file, setFile] = useState();

    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const dispatch = useDispatch()
    const [state, setState] = useState({
        username: "",
        review: "",
        image: "",
        is_featured: "",
    });

    const {
        username,
        review,
        image,
        is_featured,
    } = state;

    // Saving files
    const fileHandler = (e) => {
        const dat = e.target.files[0];
        setFile(dat);
        state.image = dat;
    }

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("image", file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        if (!username) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Username !", });
        }

        else if (!review) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill review !", });
        }
        else if (!image) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill image !", });
        }
        else if (!is_featured) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill featured !", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/testi`, formData, config)
                .then(response => {
                    // console.log(response);
                    state.image = response.data.image;
                    // Green Snackbar
                    console.log(state, "state.......")
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    dispatch(addTesti(state));
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
            navigate("/Premium-verified");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Website Review</h4>

                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name='username' onChange={onChangeHandler} placeholder='User Name' />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Review</label>
                                    <div className="col-sm-9">
                                        <textarea name="review" className="form-control" placeholder='Review' id="" cols="30" rows="10" maxlength="200"  onChange={onChangeHandler}></textarea>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" onChange={fileHandler} name='image' />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Is Featured</label>
                                    <div class="col-sm-9">
                                        <select name="is_featured" id="" className="form-control" onChange={onChangeHandler}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>

                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/Premium-verified" class="btn btn-light">Cancel</Link>
                            <button class="btn btn-primary mr-2 ml-3" onClick={handleSubmit}>Submit</button>
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

export default AddTestimonials