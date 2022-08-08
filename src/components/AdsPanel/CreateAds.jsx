import { Alert, Snackbar, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addAd } from '../../Actions/adsAction';
import { loadCategoryes } from '../../Actions/categoryAction';

const CreateAds = () => {
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    // This code is used for file upload
    const [file, setFile] = useState();

    // LOAD ACTIONS
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    // LOAD ACTIONS ENDS

    const [state, setState] = useState({
        adName: "",
        subtitle: "",
        buttonText: "",
        icon: "",
        status: "",
    });

    const [error, setError] = useState("");

    const {
        adName,
        subtitle,
        buttonText,
        icon,
        status,
    } = state;

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
        state.icon = dat;
    }

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("icon", file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        if (!adName) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Name !", });
        }
        else if (!buttonText) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Button Text !", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/ads`, formData, config)
                .then(response => {
                    // console.log(response);
                    state.icon = response.data.image;
                    // Green Snackbar
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    setError("");
                    dispatch(addAd(state));
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
            navigate("/ads");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Ads</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label">Select Category</label>
                                    <select name="subtitle" id="" className="form-control col-sm-9" onChange={onChangeHandler}>
                                        <option >Select Category</option>
                                        {categoryes &&
                                            categoryes.map((count) => {
                                                return (
                                                    <option
                                                        value={count.id}
                                                    >
                                                        {count.category_name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="adName" placeholder='Name' onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row"> 
                                    <label className="col-sm-3 col-form-label">Link </label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="buttonText" placeholder='Ex : rentolic.com/product/Bottomwear/76' onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="icon" className="form-control" onChange={fileHandler} />
                                        <p>Recommended Image Size (1350px X 500px)</p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Status</label>
                                    <select name="status" id="" className="form-control col-sm-9" onChange={onChangeHandler}>
                                        <option >Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/ads" class="btn btn-light">Cancel</Link>
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

export default CreateAds