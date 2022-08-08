import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addCity } from '../../Actions/cityAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'; 
import Snackbar from '@mui/material/Snackbar';
import { loadStates } from '../../Actions/statesAction';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCityList = () => {
    // LOAD ACTIONS
    const { states } = useSelector(state => state.statesData);
    useEffect(() => {
        dispatch(loadStates());
    }, []);

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    // This code is used for file upload
    const [file, setFile] = useState();

    const [state, setState] = useState({
        city_name: "",
        state_name: "",
        status: "1",
        is_featured: "",
        city_icon: "",
        pending_status: "1",
    });

    const [error, setError] = useState("");

    const {
        city_name,
        state_name,
        is_featured,
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
        state.city_icon = dat;
    }

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("city_icon", file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        if (!state_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill State !", });
        }
        else if (!city_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter City Name !", });
        }
        else if (!file) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select City Icon !", });
        }
        else if (!is_featured) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select is featured !", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/web/product`, formData, config)
                .then(response => {
                    // console.log(response);
                    state.city_icon = response.data.image;
                    // Green Snackbar
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    setError("");
                    dispatch(addCity(state));
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
            navigate("/City");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New City</h4>

                        <div className="row">
                            <div className="col-md-6">

                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Select State</label>
                                    <div class="col-sm-9">
                                        <select class="form-control" name="state_name" onChange={onChangeHandler}>
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
                                        <input type="text" name="city_name" className="form-control" onChange={onChangeHandler} placeholder="City Name" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">City Icon</label>
                                    <div className="col-sm-9">
                                        <input type="file" name="city_icon" className="form-control" onChange={fileHandler} />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">is featured</label>
                                    <select name="is_featured" id="" className="col-sm-8 form-control" onChange={onChangeHandler}>
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
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
    )
}

export default AddCityList