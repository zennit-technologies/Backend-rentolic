import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../Actions/productAction';
import { getSingleTesti, updateTesti } from '../../Actions/testiAction';

const ProductsEditStatus = () => {

    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        product_name: "",
    });
    const {
        product_name,
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
        if (
            !product_name 
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateTesti(state, id));
            setError("");
            navigate("/Premium-verified")
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
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Website Review List</h4>

                            <div className="row">
                                <div className="col-md-6"> 

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Review</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="product_name" placeholder='Product Name' className="form-control" value={product_name || "error"} />
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
        </>
    )
}

export default ProductsEditStatus