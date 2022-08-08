import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadCategoryes } from '../../Actions/categoryAction';
import { getSingleSubCategory, updateSubCategory } from '../../Actions/SubCategoryAction';

const EditSubCategory = () => {

    // LOAD ACTIONS
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    // LOAD ACTIONS ENDS

    // Snackbar Code  
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });

    const [state, setState] = useState({
        category_id: "",
        name: "",
        sub_cat_icon: "",
        sub_cat_image: "",
        form_field: "",
        status: "1",
    });
    const {
        category_id,
        name,
        sub_cat_icon,
        sub_cat_image,
        icon,
        image,
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
    const { subCategory } = useSelector((state) => state.subCategoryData);  
    useEffect(() => {
        dispatch(getSingleSubCategory(id))
    }, [])
    useEffect(() => {
        setState({ ...subCategory })
    }, [subCategory])

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (
            !category_id ||
            !name ||
            !status
        ) {
            setError("Please enter all fields !");
        } else { 
            dispatch(updateSubCategory(state, id));
            setError("");
            navigate("/Sub-Category")
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
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit Sub Category</h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Category</label>
                                            <select name="category_id" id="" className="form-control col-sm-9" onChange={onChangeHandler} value={category_id || ""}>
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
                                                <input type="Text" className="form-control" name="name" placeholder='sub Category Name' onChange={onChangeHandler} value={name || ""} />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Icon</label>
                                            <div className="col-sm-9">
                                                <input type="file" name="sub_cat_icon" className="form-control" onChange={onChangeHandler}
                                                //  value={sub_cat_icon || ""} 

                                                />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>
                                            <div className="col-sm-9">
                                                <input type="file" name="sub_cat_image" className="form-control" onChange={onChangeHandler}
                                                // value={sub_cat_image || ""} 

                                                />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label className="col-sm-3" for="exampleInputEmail1">Select Status</label>
                                            <select name="status" id="" className="col-sm-8" onChange={onChangeHandler} value={status || ""}>
                                                <option value="">Select</option>
                                                <option value="1">Active</option>
                                                <option value="0">InActive</option>
                                            </select>
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
        </>
    )
}

export default EditSubCategory