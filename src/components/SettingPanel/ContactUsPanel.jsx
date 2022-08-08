import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleContact, updateContact } from '../../Actions/contactAction';

const ContactUsPanel = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        address: "",
        facebook: "",
        gmail: "",
        instagram: "",
        phone: "",
        twitter: "",
        linkedin: "",
    });
    const {
        address,
        facebook,
        gmail,
        instagram,
        phone,
        twitter,
        linkedin,
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
    const { contact } = useSelector((state) => state.contactusData);
    useEffect(() => {
        dispatch(getSingleContact(id))
    }, [])
    useEffect(() => {
        setState({ ...contact })
    }, [contact])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !address ||
            !gmail
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateContact(state, id));
            setError("");
            navigate("/")
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/");
        }
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Contact Us</h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Address</label>
                                            <div className="col-sm-9">
                                                <input type="Text" className="form-control" name="address" placeholder='Full Address' onChange={onChangeHandler} value={address || ""} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Facebook Link</label>
                                            <div className="col-sm-9">
                                                <input type="text" name="facebook" className="form-control" onChange={onChangeHandler} value={facebook || ""} placeholder="Facebook Link" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Email</label>
                                            <div className="col-sm-9">
                                                <input type="email" className="form-control" name="gmail" placeholder='Email' onChange={onChangeHandler} value={gmail || ""} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Instagram Link</label>
                                            <div className="col-sm-9">
                                                <input type="text" name="instagram" className="form-control" onChange={onChangeHandler} value={instagram || ""} placeholder="Instagram Link" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Phone</label>
                                            <div className="col-sm-9">
                                                <input type="phone" className="form-control" name="phone" placeholder='Phone' onChange={onChangeHandler} value={phone || ""} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Twitter Link</label>
                                            <div className="col-sm-9">
                                                <input type="text" name="twitter" className="form-control" onChange={onChangeHandler} value={twitter || ""} placeholder="Twitter Link" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Email</label>
                                            <div className="col-sm-9">
                                                <input type="phone" className="form-control" name="phone" placeholder='Phone' onChange={onChangeHandler} value={phone || ""} />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Linkedin Link</label>
                                            <div className="col-sm-9">
                                                <input type="text" name="linkedin" className="form-control" onChange={onChangeHandler} value={linkedin || ""} placeholder="Linkedin Link" />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/" class="btn btn-light">Cancel</Link>
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

            </div>
        </>
    )
}

export default ContactUsPanel