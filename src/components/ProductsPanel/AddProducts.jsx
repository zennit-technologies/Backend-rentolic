import { useSelector, useDispatch } from 'react-redux';
import { loadCitys } from '../../Actions/cityAction';
// import { useJsApiLoader } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../../Actions/productAction';
import { loadCategoryes } from '../../Actions/categoryAction';
import { loadSubCategoryes } from '../../Actions/SubCategoryAction';
import axios from 'axios';

import Autocomplete from "react-google-autocomplete";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddProducts = () => {
    const locationRef = useRef()
    let dispatch = useDispatch();
    const { citys } = useSelector(state => state.cityData);
    useEffect(() => {
        dispatch(loadCitys());
    }, []);
    const { categoryes } = useSelector(state => state.categoryData);
    useEffect(() => {
        dispatch(loadCategoryes());
    }, []);

    const { subCategoryes } = useSelector(state => state.subCategoryData);
    useEffect(() => {
        dispatch(loadSubCategoryes());
    }, []);

    const [location, setLocation] = useState({ lat: "", lng: "" });


    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [accord, setAccord] = useState(1);
    const [error, setError] = useState("");

    // This code is used for file upload
    const [file, setFile] = useState();
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [file3, setFile3] = useState();
    const [file4, setFile4] = useState();
    // const [file5, setFile5] = useState();
    // const [file6, setFile6] = useState();
    // const [file7, setFile7] = useState();
    // const [file8, setFile8] = useState();
    // const [file9, setFile9] = useState();

    // Saving files
    const fileHandler = (e) => {
        if (e.target.name === 'images') {
            const dat = e.target.files[0];
            setFile(dat);
            state.images = dat;
        }
        else if (e.target.name === 'minImage1') {
            const dat = e.target.files[0];
            setFile1(dat);
            state.minImage1 = dat;
        }
        else if (e.target.name === 'minImage2') {
            const dat = e.target.files[0];
            setFile2(dat);
            state.minImage2 = dat;
        }
        else if (e.target.name === 'minImage3') {
            const dat = e.target.files[0];
            setFile3(dat);
            state.minImage3 = dat;
        }
        else if (e.target.name === 'minImage4') {
            const dat = e.target.files[0];
            setFile4(dat);
            state.minImage4 = dat;
        }
        // else if (e.target.name === 'minImage5') {
        //     const dat = e.target.files[0];
        //     setFile5(dat);
        //     state.minImage5 = dat;
        // }
        // else if (e.target.name === 'minImage6') {
        //     const dat = e.target.files[0];
        //     setFile6(dat);
        //     state.minImage6 = dat;
        // }
        // else if (e.target.name === 'minImage7') {
        //     const dat = e.target.files[0];
        //     setFile7(dat);
        //     state.minImage7 = dat;
        // }
        // else if (e.target.name === 'minImage8') {
        //     const dat = e.target.files[0];
        //     setFile8(dat);
        //     state.minImage8 = dat;
        // }
        // else if (e.target.name === 'minImage9') {
        //     const dat = e.target.files[0];
        //     setFile9(dat);
        //     state.minImage1 = dat;
        // }
    }

    const [state, setState] = useState({
        city: "",
        category_id: "",
        sub_category_id: "",
        brand_name: "",
        product_name: "",
        description: "",
        day_price: "",
        hour_price: "",
        month_price: "",
        threemonth_price: "",
        yearly_price: "",
        discount: "",
        security_deposit: "",
        fields: "",
        faq_field: "",
        icon_field: "",
        full_field: "",
        is_featured: "",
        images: "",
        minImage1: "",
        minImage2: "",
        minImage3: "",
        minImage4: "",
        seller_mobile: "",
        lat: "",
        log: "",
        // these var is used for specification icon
        // minImage5: "",
        // minImage6: "",
        // minImage7: "",
        // minImage8: "",
        // minImage9: "",
        is_approved: "1",
        status: ""
    });

    const {
        city,
        category_id,
        sub_category_id,
        product_name,
        brand_name,
        seller_mobile,
        description,
        day_price,
        hour_price,
        month_price,
        security_deposit,
        fields,
        is_featured,
        images,
        minImage1,
        minImage2,
        minImage3,
        minImage4,
    } = state;

    // let fieldFilter=[];
    // All dynamic filter form fields 
    const [fieldFilter, setFieldFilter] = useState('');
    const [faqFieldFilter, setFaqFieldFilter] = useState('');
    const [iconFieldFilter, setIconFieldFilter] = useState('');
    const [fullFieldFilter, setFullFieldFilter] = useState('');
    const [subCatFilter, setSubCatFilter] = useState('');

    const [dynamicField, setDynamicField] = useState();
    const [faqDynamicField, setFaqDynamicField] = useState();
    const [iconDynamicField, setIconDynamicField] = useState();
    const [fullDynamicField, setFullDynamicField] = useState();

    let navigate = useNavigate();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        console.log(state)
    };

    // const locationHandler = (e) => {
    //     console.log(locationRef)
    //     if (locationRef.current.value === '') {
    //         return
    //     }
    //     else {
    //         const autocomplete = new window.google.maps.places.Autocomplete(locationRef.current.value);
    //         console.log(autocomplete)
    //     }
    // }

    useEffect(() => {

        if (state.category_id !== '') {
            let tempCatFilter = categoryes.filter((val) => {
                return val.id == state.category_id;
            })
            setSubCatFilter(subCategoryes.filter((cur) => cur.category_id == state.category_id));
            // setSubCatFilter(tempCatFilter);
            // console.log(tempCatFilter)
            if (tempCatFilter[0].form_field !== null) {
                setFieldFilter(JSON.parse(tempCatFilter[0].form_field));
                setFaqFieldFilter(JSON.parse(tempCatFilter[0].faq_field));
                setIconFieldFilter(JSON.parse(tempCatFilter[0].icon_field));
                setFullFieldFilter(JSON.parse(tempCatFilter[0].full_field));
            }
            else {
                setFieldFilter('');
                setFaqFieldFilter('');
                setIconFieldFilter('');
                setFullFieldFilter('');
            }

        }
    }, [state.category_id])

    // Filter
    // useEffect(() => {
    //     if (state.sub_category_id !== '') {
    //         let tempFieldFilter = subCategoryes.filter((val) => {
    //             return val.id == state.sub_category_id;
    //         })
    //         setFieldFilter(JSON.parse(tempFieldFilter[0].form_field))
    //     }
    // }, [state.sub_category_id])


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

    // FILLED ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        state.lat = location.lat;
        state.log = location.lng;
        // This code is used for file upload
        const formData = new FormData();
        formData.append("images", file);
        formData.append("minImage1", file1);
        formData.append("minImage2", file2);
        formData.append("minImage3", file3);
        formData.append("minImage4", file4);
        // formData.append("minImage5", file5);
        // formData.append("minImage6", file6);
        // formData.append("minImage7", file7);
        // formData.append("minImage8", file8);
        // formData.append("minImage9", file9);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        if (!city) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select City !", });
        }

        else if (!category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Category !", });
        }
        else if (!sub_category_id) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Sub Category !", });
        }
        else if (!product_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Product Name !", });
        }
        else if (!brand_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Brand Name !", });
        }
        else if (!images) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill All Cover !", });
        }
        else if (!minImage1) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill All Images !", });
        }
        else if (!minImage2) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill All Images !", });
        }
        else if (!minImage3) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill All Images !", });
        }
        else if (!minImage4) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill All Images !", });
        }
        else if (!state.hour_price && !state.day_price && !state.month_price && !state.threemonth_price && !state.yearly_price) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Price !", });
        }
        else if (!is_featured) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Featured !", });
        }
        else if (!state.lat && !state.log) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Location !", });
        }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/product`, formData, config)
                .then(response => {
                    console.log(response);
                    state.images = response.data.image;
                    state.minImage1 = response.data.image1;
                    state.minImage2 = response.data.image2;
                    state.minImage3 = response.data.image3;
                    state.minImage4 = response.data.image4;
                    // state.minImage5 = response.data.image5;
                    // state.minImage6 = response.data.image6;
                    // state.minImage7 = response.data.image7;
                    // state.minImage8 = response.data.image8;
                    // state.minImage9 = response.data.image9;
                    // Green Snackbar
                    setOpen(true);
                    state.fields = JSON.stringify(dynamicField);
                    state.faq_field = JSON.stringify(faqDynamicField);
                    state.icon_field = JSON.stringify(iconDynamicField);
                    state.full_field = JSON.stringify(fullDynamicField);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    dispatch(addProduct(state));
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
            navigate("/Products");
        }
    };

    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Product</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Select City</label>
                                    <select name="city" id="" className="col-sm-8" onChange={onChangeHandler}>
                                        <option value="">Select City</option>

                                        {citys.map((val) => {
                                            return <option value={val.id}>{val.city_name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Category</label>
                                    <select name="category_id" id="" className="col-sm-8 form-control " onChange={onChangeHandler}>
                                        <option value="">Select Category</option>
                                        {categoryes &&
                                            categoryes.map((counts) => {
                                                return (
                                                    <option
                                                        value={counts.id}
                                                    >
                                                        {counts.category_name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Select Sub Category</label>
                                    <select name="sub_category_id" id="" className="col-sm-8 form-control " onChange={onChangeHandler}>
                                        <option value="">Select Sub Category</option>
                                        {subCatFilter.length !== 0 ? subCatFilter &&
                                            subCatFilter.map((count) => {
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
                                        <input type="text" className="form-control" name="product_name" placeholder='Product Name' onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Brand Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="brand_name" placeholder='Brand Name' onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Description</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="description" onChange={onChangeHandler} placeholder="Product Description" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Hour)</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="hour_price" onChange={onChangeHandler} placeholder="Product Amount (Hour)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Days)</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="day_price" onChange={onChangeHandler} placeholder="Product Amount (Days)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Month)</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="month_price" onChange={onChangeHandler} placeholder="Product Amount (Month)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Quarterly)</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="threemonth_price" onChange={onChangeHandler} placeholder="Product Amount (Quarterly)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Product Amount (Yearly)</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="yearly_price" onChange={onChangeHandler} placeholder="Product Amount (Yearly)" onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Discount (%)</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="discount" onChange={onChangeHandler} onWheel={(e) => e.target.blur()} placeholder='Discount' max="2" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Security Deposit</label>
                                    <div className="col-sm-9">
                                        <input type="number" className="form-control" name="security_deposit" onChange={onChangeHandler} onWheel={(e) => e.target.blur()} placeholder='Security Deposit' min="0" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Location <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <Autocomplete
                                            className="form-control"
                                            apiKey={'AIzaSyBjNd5-n0m0NtT1qA4iKmgM3ahD2Podpas'}
                                            options={{
                                                types: ["(regions)"],
                                            }}
                                            onPlaceSelected={(place) => {
                                                setLocation({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Phone Number <span className='red'>*</span></label>
                                    <div className="col-sm-9">
                                        <input type="number" min="0" className="form-control" name="seller_mobile" placeholder='Phone Number' onChange={onChangeHandler} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Cover Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="images" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage1" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage2" onChange={fileHandler} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage3" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Display Image</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" name="minImage4" onChange={fileHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">is featured</label>
                                    <select name="is_featured" id="" className="col-sm-8" onChange={onChangeHandler}>
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>

                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3" for="exampleInputEmail1">Status</label>
                                    <select name="status" id="" className="col-sm-8" onChange={onChangeHandler}>
                                        <option value="">Select Status</option>
                                        <option value="1">Action</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">

                                <div className="accordion">
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(1) }}>
                                            Fields
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 1 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                {fieldFilter !== '' ? fieldFilter.map((count, i) => {
                                                    return (<div className="form-group row" key={i}>
                                                        {
                                                            count.type === 'dropdown' ? <><label className="col-sm-3 col-form-label">{count.field}</label>
                                                                <div className="col-sm-9">
                                                                    <select className='form-control' name={count.field} onChange={(e) => dynamicFieldHandler(e, '1')}>
                                                                        <option>Select</option>
                                                                        {count.options && count.options.map((val) => {
                                                                            return <option value={val}>{val}</option>
                                                                        })}

                                                                    </select>
                                                                </div></> : count.type === 'radio' ? <>
                                                                    <label className="col-sm-3 col-form-label">{count.field}</label>
                                                                    <div className="col-sm-9">
                                                                        <div className="form-group row">
                                                                    {count.options && count.options.map((val) => {
                                                                        return <div className="col-sm-3 d-flex align-items-center"><input type={count.type} value={val} name={count.field} onChange={(e) => dynamicFieldHandler(e, '1')}/><label className="mt-2 ml-2">{val}</label><br/></div>
                                                                    })}
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    
                                                                </> : <><label className="col-sm-3 col-form-label">{count.field}</label>
                                                                <div className="col-sm-9">
                                                                    <input type={count.type} className="form-control" name={count.field} onChange={(e) => dynamicFieldHandler(e, '1')} />
                                                                </div></>
                                                        }
                                                    </div>)
                                                }) : <h4>Not Found</h4>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(3) }}>
                                            Full Specification (Icon)
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 3 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage5" onChange={fileHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage6" onChange={fileHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage7" onChange={fileHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage8" onChange={fileHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="minImage9" onChange={fileHandler} />
                                                    </div>
                                                </div>
                                               

                                            </div>
                                        </div>
                                    </div> */}
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

export default AddProducts

