import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleCity, updateCity } from '../../Actions/cityAction';
import { loadStates } from '../../Actions/statesAction';

const EditCity = () => {
    // LOAD ACTIONS
    const { states } = useSelector(state => state.statesData);
    useEffect(() => {
        dispatch(loadStates());
    }, []);

    // Snackbar Code  
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        city_name: "",
        state_name: "",
        status: "1",
        is_featured: "",
        pending_status: "",
        status: "",
    });

    const {
        city_name,
        state_name,
        is_featured,
        pending_status,
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
    const { city } = useSelector((state) => state.cityData);
    useEffect(() => {
        dispatch(getSingleCity(id))
    }, [])
    useEffect(() => {
        setState({ ...city })
    }, [city])

    // for submit form 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !city_name ||
            !state_name ||
            !is_featured ||
            !pending_status ||
            !status
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateCity(state, id));
            setError("");
            navigate("/city")
        }
    };


    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            // navigate("/City");
        }
    };
    return (
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit City</h4>

                            <div className="row">
                                <div className="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Select State</label>
                                        <div class="col-sm-9">
                                            <select class="form-control" name="state_name" onChange={onChangeHandler} value={state_name || ""}>
                                                <option>Select</option>
                                                {states &&
                                                    states.map((count) => {
                                                        return (
                                                            <option
                                                                value={count.state_name}
                                                            >
                                                                {count.state_name}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">City Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="city_name" className="form-control" onChange={onChangeHandler} placeholder="City Name" value={city_name || ""} />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">is featured</label>
                                        <select name="is_featured" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={is_featured || ""}>
                                            <option value="">Select</option>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>

                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Request Status</label>
                                        <select name="pending_status" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={pending_status || ""}>
                                            <option value="">Select Request Status</option>
                                            <option value="1">Accept</option>
                                            <option value="2">Decline</option>
                                        </select>
                                    </div>

                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Website Status</label>
                                        <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={status || ""}>
                                            <option value="">Select Website Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">InActive</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/City" class="btn btn-light">Cancel</Link>
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

export default EditCity