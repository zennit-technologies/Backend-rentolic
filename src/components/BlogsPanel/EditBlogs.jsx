import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleBlog, updateBlog } from '../../Actions/blogAction';

const EditBlogs = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        name: "",
        blog_title: "",
        degisation: "",
        image: "",
        image2: "",
        status: "",
    });
    const {
        name,
        blog_title,
        degisation,
        image,
        image2,
        status
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
    const { blog } = useSelector((state) => state.blogData);
    useEffect(() => {
        dispatch(getSingleBlog(id))
    }, [])
    useEffect(() => {
        setState({ ...blog })
    }, [blog])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !name ||
            !blog_title ||
            !degisation ||
            !status
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateBlog(state, id));
            setError("");
            navigate("/Blogs")
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
        <>
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
                                            <input type="text" name="name" className="form-control" placeholder='Blog Auther' onChange={onChangeHandler} value={name || ""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Blog Title</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="blog_title" className="form-control" placeholder='Blog Title' onChange={onChangeHandler} value={blog_title || ""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label"> Blog Description</label>
                                        <div className="col-sm-9">
                                            <textarea name="degisation" id="" cols="30" rows="10" className="form-control" placeholder='Blog Description' onChange={onChangeHandler} value={degisation || ""}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Image</label>
                                        <div className="col-sm-9">
                                            <input type="file" name="image" className="form-control" onChange={onChangeHandler} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Image Two</label>
                                        <div className="col-sm-9">
                                            <input type="file" name="image2" className="form-control" onChange={onChangeHandler} />
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
        </>
    )
}

export default EditBlogs