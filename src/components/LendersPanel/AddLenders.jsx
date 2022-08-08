import React, { useEffect, useState } from 'react'
// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from 'react-router-dom';
import { addLender } from '../../Actions/lenderAction'
import { useDispatch, useSelector } from 'react-redux';
import { loadCitys } from '../../Actions/cityAction';

const Alert = React.forwardRef(function Alert(props, ref) { 
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddLenders = () => {

    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const dispatch = useDispatch()
    const [state, setState] = useState({
        city: "",
        lender_name: "",
        lender_email: "",
        lender_password: "$2a$12$3v8IAF10govYbiew1E1DLeaqiTI4xvj0xmpL7I5C0PJY6aDBHZjRO",
        lender_phone: "",
        lender_description: "",
        status: "1",
    });

    const {
        lender_name,
        lender_email,
        lender_password,
        lender_phone,
        city,
    } = state;

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    const handleImage = (e) => {
        console.log("first...............")
        let img = e.target.files[0];
        console.log(img, "...........img")
        if (e.target.name === 'doc_type1') {
            setState({
                doc_type1: img
            })
        } else if (e.target.name === 'doc_type2') {
            setState({
                doc_type2: img
            })
        } else if (e.target.name === 'lender_profile_pic') {
            setState({
                lender_profile_pic: img
            })
        }


    }
    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!lender_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Username !", });
        }

        else if (!lender_email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Email !", });
        }
        else if (!city) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill City !", });
        }
        else if (!lender_password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Password !", });
        }
        else if (!lender_phone) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Phone !", });
        }

        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Added Successfully", });
            dispatch(addLender(state));
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
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card card-color">
                    <div className="card-body">
                        <h4 className="card-title">Create New Lender</h4>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Select City</label>
                                    <div class="col-sm-9">
                                        <select name="city" id="" className="form-control" onChange={onChangeHandler}>
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
                                        <input type="text" className="form-control" name="lender_name" onChange={onChangeHandler} placeholder="Lender Username" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Lender Email</label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" name="lender_email" onChange={onChangeHandler} placeholder="Lender Email" />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Lender Phone</label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" name="lender_phone" onChange={onChangeHandler} placeholder="Lender Phone" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Lender Password</label>
                                    <div class="col-sm-9">
                                        {/* <input type="text" className="form-control" onChange={onChangeHandler} placeholder="123456" /> */}
                                        <p>Password Will Be 123456 For Now.</p>
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
    )
}

export default AddLenders