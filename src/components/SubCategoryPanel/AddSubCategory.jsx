import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadCategoryes } from '../../Actions/categoryAction';
import { addSubCategory } from '../../Actions/SubCategoryAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddSubCategory = () => {
    // LOAD ACTIONS
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    // LOAD ACTIONS ENDS

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [defaultField, setDefaultField] = useState(["Brand Name", "Model", "Rate", "Minimum Booking Price"]);
    const [fieldData, setFieldData] = useState([]);
    const [tempField, setTempField] = useState("");

    const [state, setState] = useState({
        id: "00000",
        category_id: "",
        name: "",
        sub_cat_icon: "",
        sub_cat_image: "",
        status: "1",
    });

    // This code is used for file upload
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();

    const fileHandler = (e) => {
        if (e.target.name === 'sub_cat_icon') {
            const dat = e.target.files[0];
            setFile1(dat);
            state.sub_cat_icon = dat;

        }
        else if (e.target.name === 'sub_cat_image') {
            const dat = e.target.files[0];
            setFile2(dat);
            state.sub_cat_image = dat;
        }
    }

    const [error, setError] = useState("");

    const {
        category_id,
        name,
        sub_cat_icon,
        sub_cat_image,
        status,
    } = state;

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const changefieldHandler = (e) => {
        setTempField(e.target.value);
    }
    const fieldHandler = () => {
        if (tempField === "") {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Input Field !", });
        }
        else {
            console.log(tempField)
            setFieldData([...fieldData, tempField]);
            setTempField("")
        }
    }
    const fieldFilter = (data) => {
        console.log(fieldData)
        const filter = fieldData.filter((val) => {
            if (val !== data) {
                return val;
            }
        })
        console.log(filter)
        setFieldData(filter)
    }


    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("sub_cat_icon", file1);
        formData.append("sub_cat_image", file2);

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        // const allFields = [defaultField, fieldData]
        // let flatField = [].concat.apply([], allFields);
        // flatField = JSON.stringify(flatField)
        // console.log(flatField); 
        // state.form_field = flatField;
        if (!category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Category Name !", });
        }
        else if (!name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Enter Sub Category Name !", });
        }
        else if (!file1) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Icon !", });
        }
        else if (!file2) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Image!", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/subcat`, formData, config)
                .then(response => {
                    console.log(response);
                    state.sub_cat_image = response.data.active_url;
                    state.sub_cat_icon = response.data.inactive_url;
                    // Green Snackbar
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    setError("");
                    dispatch(addSubCategory(state));
                    setError("");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create New Sub Category</h4>

                            <div className="row">
                                <div className="col-md-6">
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Category</label>
                                        <select name="category_id" id="" className="form-control col-sm-9" onChange={onChangeHandler}>
                                            <option >Select Category</option>
                                            {categoryes &&
                                                categoryes.map((count) => {
                                                    return (
                                                        <option
                                                            value={count.id}
                                                        >
                                                            {count.category_name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Sub Category</label>
                                        <div className="col-sm-9">
                                            <input type="Text" className="form-control" name="name" placeholder='sub Category Name' onChange={onChangeHandler} />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Banner</label>
                                        <div className="col-sm-9">
                                            <input type="file" name="sub_cat_icon" className="form-control" onChange={fileHandler} />
                                            <p>Recommended Image Size (1350px X 420px)</p>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>
                                        <div className="col-sm-9">
                                            <input type="file" name="sub_cat_image" className="form-control" onChange={fileHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/Sub-Category" class="btn btn-light">Cancel</Link>
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
    )
}

export default AddSubCategory