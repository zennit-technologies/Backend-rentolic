import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAdmin } from '../../Actions/adminAction'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddAdminList = () => {
    // const [adminName,setAdminName]=useState('')
    // const [adminEmail,setAdminEmail]=useState('')
    // const [adminPhone,setAdminPhone]=useState('')
    // const [adminPassword,setAdminPassword]=useState('')
    // const [adminRole,setAdminRole]=useState('')
    // const [adminDob,setAdminDob]=useState('')
    // const [adminCategory,setAdminCategory]=useState('')
    // const [adminMembership,setAdminMembership]=useState('') 
    // const [adminAddress,setAdminAddress]=useState('')
    // const [adminAddress_2,setAdminAddress_2]=useState('')
    // const [adminPostcode,setAdminPostcode]=useState('')
    // const [adminCity,setAdminCity]=useState('')
    // const [adminCountry,setAdminCountry]=useState('')
    // const [adminSate,setAdminState]=useState('')
    // const dispatch=useDispatch()
    // const addAdminData=async()=>{
    //     const adminObject={
    //         admin_name:  "adminName",
    //         admin_email:  "adminEmail",
    //         admin_password: 123456789,
    //         admin_phone: 1234456,
    //         status:1,
    //         role:"male",

    //     }
    //     const val={
    //         adminDob,
    //         adminCategory,
    //         adminMembership,
    //         adminAddress,
    //         adminAddress_2,
    //         adminPostcode,
    //         adminCity,
    //         adminCountry,
    //         adminSate
    //     }
    //     const addadminFun=await  addAdmin(adminObject);
    //     console.log(addadminFun,"..............addadminFun.........")
    //     console.log(adminObject,"..............object.........")
    // }

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        admin_name: "",
        admin_email: "",
        admin_password: "",
        admin_phone: "",
        status: "1"
    });

    const [error, setError] = useState("");

    const {
        admin_name,
        admin_email,
        admin_password,
        admin_phone,
    } = state;

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!admin_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Category !", });
        }
        else if (!admin_email) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category Name !", });
        }
        else if (!admin_password) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category Name !", });
        }
        else if (!admin_phone) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category Name !", });
        }
        else {
            // Green Snackbar
            setOpen(true);
            setAlert({ sev: "success", content: "Added Successfully", });
            setError("");
            dispatch(addAdmin(state));
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
            navigate("/admin");
        }
    };


    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Admin</h4>
                        <p className="card-description">
                            Personal info
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Admin Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" name='admin_name' className="form-control" onChange={onChangeHandler}  placeholder="Admin Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Admin Email</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="admin_email" className="form-control" onChange={onChangeHandler} placeholder="Admin Email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Admin Phone</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="admin_phone" className="form-control" onChange={onChangeHandler} placeholder="Admin Phone"/>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Admin Password</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="admin_password" className="form-control" onChange={onChangeHandler} placeholder="Admin Password"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/admin" class="btn btn-light">Cancel</Link>
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

export default AddAdminList