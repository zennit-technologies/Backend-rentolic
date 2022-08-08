import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadCitys } from '../../Actions/cityAction';
import { getSingleLender, updateLender } from '../../Actions/lenderAction';

const EditLenders = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        city: "",
        lender_name: "",
        lender_email: "",
        lender_password: "",
        lender_phone: "",
        lender_description: "",
    });
    const {
        lender_name,
        lender_email,
        lender_password,
        lender_phone,
        city,
        lender_description,
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

    // LOAD ACTIONS
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);
    // LOAD ACTIONS ENDS

    // fetch single taxlist
    const { lender } = useSelector((state) => state.lenderData);
    useEffect(() => {
        dispatch(getSingleLender(id))
    }, [])
    useEffect(() => {
        setState({ ...lender })
    }, [lender])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !lender_name ||
            !lender_email ||
            !lender_password ||
            !lender_phone ||
            !city 
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateLender(state, id));
            setError("");
            navigate("/Lenders")
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/Lenders");
        }
    };
    return (
        <>
            <div className="container">
                <div className="col-12 grid-margin">
                    <div className="card card-color">
                        <div className="card-body">
                            <h4 className="card-title"> Edit Lender</h4>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Select City</label>
                                        <div class="col-sm-9">
                                            <select name="city" id="" className="form-control" onChange={onChangeHandler} value={city || ""}>
                                                <option value="">Select City</option>

                                                {citys.map((val) => {
                                                    return <option value={val.id}>{val.city_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Lender Name</label>
                                        <div class="col-sm-9">
                                            <input type="text" className="form-control" name="lender_name" onChange={onChangeHandler} placeholder="Lender Username" value={lender_name || ""} />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Lender Email</label>
                                        <div class="col-sm-9">
                                            <input type="text" className="form-control" name="lender_email" onChange={onChangeHandler} placeholder="Lender Email" value={lender_email || ""} />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Lender Phone</label>
                                        <div class="col-sm-9">
                                            <input type="text" className="form-control" name="lender_phone" onChange={onChangeHandler} placeholder="Lender Phone" value={lender_phone || ""} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Lender Password</label>
                                        <div class="col-sm-9">
                                            <input type="text" className="form-control" name="lender_password" onChange={onChangeHandler} placeholder="Lender Password" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div class="row">
                                <div class="col-md-12">
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" name="lender_description" onChange={onChangeHandler} 
                                            value={lender_description || ""}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">

                                <Link to="/Lenders" class="btn btn-light">Cancel</Link>

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

export default EditLenders