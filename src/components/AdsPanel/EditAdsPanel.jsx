import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleAd, updateAd } from '../../Actions/adsAction';
import { loadCategoryes } from '../../Actions/categoryAction';

const EditAdsPanel = () => {

    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

        // LOAD ACTIONS
        const { categoryes } = useSelector(state => state.categoryData);
        useEffect(() => {
            dispatch(loadCategoryes());
        }, []);
        // LOAD ACTIONS ENDS

    const [state, setState] = useState({
        adName: "",
        buttonText: "",
        icon: "",
        subtitle: "",
        status: "",
    });
    const {
        adName,
        buttonText,
        subtitle,
        icon,
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

    // fetch single taxlist
    const { ad } = useSelector((state) => state.adData);
    useEffect(() => {
        dispatch(getSingleAd(id))
    }, [])
    useEffect(() => {
        setState({ ...ad })
    }, [ad]) 

    // for submit form 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !adName ||
            !buttonText ||
            !status
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateAd(state, id));
            setError("");
            navigate("/ads")
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
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit Ads</h4>
                            <div className="row">
                                <div className="col-md-6">

                                <div class="form-group row">
                                    <label className="col-sm-3 col-form-label">Select Category</label>
                                    <select name="subtitle" id="" className="form-control col-sm-9" value={subtitle || ""} onChange={onChangeHandler}>
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
                                            <input type="text" className="form-control" name="adName" placeholder='Name' onChange={onChangeHandler} value={adName || ""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Button text</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="buttonText" placeholder='Ex : Shop Now' onChange={onChangeHandler} value={buttonText || ""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Image</label>
                                        <div className="col-sm-9">
                                            {/* <input type="file" name="icon" className="form-control" onChange={file} value={icon || ""} /> */}
                                            <img src={`${process.env.REACT_APP_IPURL}${state.icon}`} alt="" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Status</label>
                                        <select name="status" id="" className="form-control col-sm-9" onChange={onChangeHandler} value={status || ""}>
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
        </>
    )
}

export default EditAdsPanel