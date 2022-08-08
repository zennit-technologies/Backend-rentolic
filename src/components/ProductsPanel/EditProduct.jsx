import { Alert, Snackbar, Stack, useForkRef } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadCategoryes } from '../../Actions/categoryAction';
import { loadCitys } from '../../Actions/cityAction';
import { getSingleProduct, updateProduct } from '../../Actions/productAction';
import { loadSubCategoryes } from '../../Actions/SubCategoryAction';

const EditProduct = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [filterSubCat, setFilterSubCat] = useState();

    const [state, setState] = useState({
        city: "",
        category_id: "",
        sub_category_id: "",
        product_name: "",
        description: "",
        day_price: "",
        hour_price: "",
        month_price: "",
        discount: "",
        security_deposit: "",
        fields: "",
        faq_field: "",
        icon_field: "",
        full_field: "",
        is_featured: "",
        images: "",
        status: ""
    });
    const {
        city,
        category_id,
        sub_category_id,
        product_name,
        description,
        day_price,
        hour_price,
        month_price,
        fields,
        is_featured,
        min_book_hour_price,
        min_book_day_price,
        min_book_month_price,
        status,
    } = state;

    // All dynamic filter form fields 
    const [fieldFilter, setFieldFilter] = useState([]);
    const [faqFieldFilter, setFaqFieldFilter] = useState([]);
    const [iconFieldFilter, setIconFieldFilter] = useState([]);
    const [fullFieldFilter, setFullFieldFilter] = useState([]);
    const [subCatFilter, setSubCatFilter] = useState('');

    const [dynamicField, setDynamicField] = useState();
    const [faqDynamicField, setFaqDynamicField] = useState();
    const [iconDynamicField, setIconDynamicField] = useState();
    const [fullDynamicField, setFullDynamicField] = useState();

    const [accord, setAccord] = useState(1);


    // LOAD ACTIONS
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);
    // LOAD ACTIONS ENDS

    // LOAD ACTIONS
    const { subCategoryes } = useSelector(state => state.subCategoryData);
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);

    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);
    // LOAD ACTIONS ENDS

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
    const { product } = useSelector((state) => state.productData);
    setFieldFilter(state.fields);
    setFaqFieldFilter(state.faq_field);
    setIconFieldFilter(state.icon_field);
    setFullFieldFilter(state.full_field);
    console.log(JSON.parse(state.fields))
    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [])
    useEffect(() => {
        setState({ ...product[0] })
    }, [product])
    useEffect(() => {
        if (state.category_id !== '') {
            setFilterSubCat(subCategoryes.filter((cur) => cur.category_id == state.category_id));
            if (state !== '') {


            }
        }
    }, [state.category_id])

    const dynamicFieldHandler = (e, finder) => {
        let { name, value } = e.target;
        if (finder === '1') {
            setDynamicField({ ...dynamicField, [name]: value });
        }
        else if (finder === '2') {
            setFaqDynamicField({ ...faqDynamicField, [name]: value });
        }
        else if (finder === '3') {
            setIconDynamicField({ ...iconDynamicField, [name]: value });
        }
        else {
            setFullDynamicField({ ...fullDynamicField, [name]: value });
        }
    }

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !city ||
            !sub_category_id ||
            !product_name ||
            !description ||
            !day_price ||
            !hour_price ||
            !month_price ||
            !is_featured ||
            !min_book_hour_price ||
            !min_book_day_price ||
            !min_book_month_price
        ) {
            setError("Please enter all fields !");
        } else {
            dispatch(updateProduct(state, id));
            setError("");
            navigate("/Products")
        }
    };

    // Cancel Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        if (alert.sev === 'success') {
            navigate("/Products");
        }
    };
    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Select City</label>
                                    <select name="city" id="" className="col-sm-8" value={state.city} onChange={onChangeHandler}>
                                        <option value="">Select City</option>

                                        {citys.map((val) => {
                                            return <option value={val.id}>{val.city_name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Category</label>
                                    <select name="category_id" id="" className="col-sm-8 form-control " value={state.category_id} onChange={onChangeHandler} >
                                        <option value="">Select Category</option>
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

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Sub Category</label>
                                    <select name="sub_category_id" id="" className="col-sm-8 form-control " value={state.sub_category_id} onChange={onChangeHandler} >
                                        <option value="">Select Sub Category</option>
                                        {filterSubCat !== '' ? filterSubCat &&
                                            filterSubCat.map((count) => {
                                                return (
                                                    <option
                                                        value={count.id}
                                                    >
                                                        {count.name}
                                                    </option>
                                                );
                                            }) : <option value="" disabled>
                                            Not Found
                                        </option>}
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="product_name" value={state.product_name} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Description</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="description" value={state.description} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Hour)</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="hour_price" value={state.hour_price} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Days)</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="day_price" value={state.day_price} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Month)</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="month_price" value={state.month_price} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Min Book Amount (Hour)</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="min_book_hour_price" value={state.min_book_hour_price} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Min Book Amount (Day)</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="min_book_day_price" value={state.min_book_day_price} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Min Book Amount (Month)</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="min_book_month_price" value={state.min_book_month_price} onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">is featured</label>
                                    <select name="is_featured" id="" className="col-sm-8" value={state.is_featured} onChange={onChangeHandler} >
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>

                                    </select>
                                </div>


                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="images" onChange={onChangeHandler} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Select Status</label>
                                    <select name="status" id="" className="col-sm-8" value={state.status} onChange={onChangeHandler} >
                                        <option value="">Select</option>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                        <option value="2">Pending</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="accordion">
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(1) }}>
                                            Fields
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 1 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {fieldFilter !== '' ? fieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        <label className="col-sm-3 col-form-label">{count}</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control" name={count} onChange={(e) => dynamicFieldHandler(e, '1')} />
                                                        </div>
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(2) }}>
                                            FAQ
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 2 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {faqFieldFilter !== '' ? faqFieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        <label className="col-sm-3 col-form-label">{count}</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control" name={count} onChange={(e) => dynamicFieldHandler(e, '2')} />
                                                        </div>
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(3) }}>
                                            Full Specification (Icon)
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 3 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {iconFieldFilter !== '' ? iconFieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        <label className="col-sm-3 col-form-label">{count}</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control" name={count} onChange={(e) => dynamicFieldHandler(e, '3')} />
                                                        </div>
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(4) }}>
                                            Full Specification
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 4 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {fullFieldFilter !== '' ? fullFieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        <label className="col-sm-3 col-form-label">{count}</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control" name={count} onChange={(e) => dynamicFieldHandler(e, '4')} />
                                                        </div>
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/Products" className="btn btn-light">Cancel</Link>

                            <button className="btn btn-primary mr-2 ml-2" onClick={handleSubmit}>Submit</button>
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

export default EditProduct