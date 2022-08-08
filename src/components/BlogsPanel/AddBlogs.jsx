import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { loadStates } from '../../Actions/statesAction';
import { addBlog } from '../../Actions/blogAction';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AddBlogs = () => {
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    // This code is used for file upload
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();

    const fileHandler = (e) => {
        if (e.target.name === 'image') {
            const dat = e.target.files[0];
            setFile1(dat);
            state.image = dat;

        }
        else if (e.target.name === 'image2') {
            const dat = e.target.files[0];
            setFile2(dat);
            state.image2 = dat;
        }
    }

    const [state, setState] = useState({
        name: "",
        blog_title: "",
        degisation: "",
        image: "",
        image2: "",
        status: "",
    });

    const [error, setError] = useState("");

    const {
        name,
        blog_title,
        degisation,
        image,
        image2,
        status
    } = state;

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("image", file1);
        formData.append("image2", file2);

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        if (!name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Name !", });
        }
        else if (!degisation) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Description !", });
        }
        else if (!blog_title) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Blog Title !", });
        }
        else if (!status) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Status !", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/blog`, formData, config)
                .then(response => {
                    console.log(response);
                    state.image = response.data.image;
                    state.image2 = response.data.image2;
                    // Green Snackbar
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    setError("");
                    dispatch(addBlog(state));
                    setError("");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/Blogs");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Blog</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Blog Auther</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="name" className="form-control" placeholder='Blog Auther' onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Blog Title</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="blog_title" className="form-control" placeholder='Blog Title' onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label"> Blog Description</label>
                                    <div className="col-sm-9">
                                        <textarea name="degisation" id="" cols="30" rows="10" className="form-control" placeholder='Blog Description' onChange={onChangeHandler}></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="image" className="form-control" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Image Two</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="image2" className="form-control" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                    <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler}>
                                        <option value="">Select</option>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/Blogs" class="btn btn-light">Cancel</Link>
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

export default AddBlogs