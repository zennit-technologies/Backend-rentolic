import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleTesti, updateTesti } from '../../Actions/testiAction';

const EditTestimonials = () => {

    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        username: "",
        review: "",
        is_featured: "",
    });
    const {
        username,
        review,
        is_featured,
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
    const { testi } = useSelector((state) => state.testiData);
    useEffect(() => {
        dispatch(getSingleTesti(id))
    }, [])
    useEffect(() => {
        setState({ ...testi })
    }, [testi])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !username ||
            !review ||
            !is_featured
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
                                        <label className="col-sm-3 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name='username' onChange={onChangeHandler} placeholder='User Name' value={username || ""} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Review</label>
                                        <div className="col-sm-9">
                                            <textarea name="review" className="form-control" placeholder='Review' cols="30" rows="10" onChange={onChangeHandler} value={review || ""}></textarea>
                                        </div>
                                    </div>

                                    {/* <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>


                                        <div className="col-sm-9">
                                            <textarea name="review" className="form-control" placeholder='Review' id="" cols="30" rows="10" onChange={onChangeHandler} ></textarea>
                                        </div>
                                    </div> */}

                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Is Featured</label>
                                        <div class="col-sm-9">
                                            <select name="is_featured" id="" className="form-control" onChange={onChangeHandler} value={is_featured || ""} >
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
        </>
    )
}

export default EditTestimonials