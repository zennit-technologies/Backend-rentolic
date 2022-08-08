import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../../Actions/productAction';

const EditPendingProduct = () => {
    // LOAD ACTIONS
    // const { states } = useSelector(state => state.statesData);
    // useEffect(() => {
    //     dispatch(loadStates());
    // }, []);

    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        is_approved: "",
        status: "",
        is_featured: "",
    });

    const {
        is_approved,
        is_featured,
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
    const { product } = useSelector((state) => state.productData);
    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [])
    useEffect(() => {
        setState({ ...product })
    }, [product])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!is_approved) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select is_approved !", });
        }
        else if (!is_featured) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select is_featured !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Added Successfully", });
            setError("");
            dispatch(updateProduct(state));
            console.log(state)
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
            navigate("/Products");
        }
    };
    return (
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">View Pending Product</h4>

                            <div className="row">
                                <div className="col-md-6">

                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">is featured</label>
                                    <select name="is_featured" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={state.is_featured || ""}>
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>

                                    </select> 
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                    <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={state.status || ""}>
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>

                                    </select> 
                                </div>

                                    <div class="form-group row">
                                        <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                        <select name="is_approved" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={state.is_approved || ""}>
                                            <option value="">Select</option>
                                            <option value="1">Approved</option>
                                            <option value="0">Decline</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/Products" class="btn btn-light">Cancel</Link>
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

export default EditPendingProduct