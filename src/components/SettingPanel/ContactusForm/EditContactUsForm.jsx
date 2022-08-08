import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleContactus } from '../../../Actions/contactUsAction';

const EditContactUsForm = () => {

    // Snackbar Code  
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const {
        name,
        email,
        phone,
        subject,
        message,
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
    const { contactus } = useSelector((state) => state.contactData);
    useEffect(() => {
        dispatch(getSingleContactus(id))
    }, [])
    useEffect(() => {
        setState({ ...contactus })
    }, [contactus])

    // for submit form
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (
    //         !category_id ||
    //         !name ||
    //         !status
    //     ) {
    //         setError("Please enter all fields !");
    //     } else {
    //         dispatch(updateSubCategory(state, id));
    //         setError("");
    //         navigate("/Sub-Category")
    //     }
    // };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/Sub-Category");
        }
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">View contact Form</h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Name</label>
                                            <div className="col-sm-9">
                                                <input type="Text" className="form-control" name="name" placeholder='Name' onChange={onChangeHandler} value={name || ""} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Email</label>
                                            <div className="col-sm-9">
                                                <input type="email" className="form-control" name="email" placeholder='Email' onChange={onChangeHandler} value={email || ""} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Phone</label>
                                            <div className="col-sm-9">
                                                <input type="phone" className="form-control" name="phone" placeholder='phone' onChange={onChangeHandler} value={phone || ""} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Subject</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="subject" placeholder='subject' onChange={onChangeHandler} value={subject || ""} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Message</label>
                                            <div className="col-sm-9">
                                                <textarea className="form-control" name="message" id="" cols="30" rows="10" onChange={onChangeHandler} value={message || ""}></textarea>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                    <Link to="/Admin/contact-us-form" class="btn btn-light">Cancel</Link>
                                    {/* <button class="btn btn-primary mr-2 ml-3" onClick={handleSubmit}>Submit</button>
                                    Snackbar */}
                                    {/* <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                            {alert.content}
                                        </Alert>
                                    </Snackbar> */}
                                </Stack>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditContactUsForm