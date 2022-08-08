import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addCategory } from '../../Actions/categoryAction';


// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCategoryList = () => {
    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [tabFilter, setTabFilter] = useState(1);

    const [fieldData, setFieldData] = useState([]);
    const [tempField, setTempField] = useState({ type: "", field: "", options: [] });
    const [dropDownOptions, setDropDownOptions] = useState([])
    const [tempDropDownOptions, setTempDropDownOptions] = useState('')

    // faq field
    const [fieldDataFaq, setFieldDataFaq] = useState([]);
    const [tempFieldFaq, setTempFieldFaq] = useState({ question: "", answer: "" });


    // icon field
    const [fieldDataIcon, setFieldDataIcon] = useState([]);
    const [tempFieldIcon, setTempFieldIcon] = useState("");


    // full field
    const [fieldDataFull, setFieldDataFull] = useState([]);
    const [tempFieldFull, setTempFieldFull] = useState("");





    // This code is used for file upload
    const [file1, setFile1] = useState();
    // const [file2, setFile2] = useState();
    // icon
    const [file3, setFile3] = useState();
    const [file4, setFile4] = useState();
    const [file5, setFile5] = useState();
    const [file6, setFile6] = useState();
    const [file7, setFile7] = useState();

    const fileHandler = (e) => {
        if (e.target.name === 'image') {
            const dat = e.target.files[0];
            setFile1(dat);
            state.image = dat;

        }
        // else if (e.target.name === 'icon') {
        //     const dat = e.target.files[0];
        //     setFile2(dat);
        //     state.icon = dat;
        // }
        // icon
        else if (e.target.name === 'icon1') {
            const dat = e.target.files[0];
            setFile3(dat);
            state.icon1 = dat;
        }
        else if (e.target.name === 'icon2') {
            const dat = e.target.files[0];
            setFile4(dat);
            state.icon2 = dat;
        }
        else if (e.target.name === 'icon3') {
            const dat = e.target.files[0];
            setFile5(dat);
            state.icon3 = dat;
        }
        else if (e.target.name === 'icon4') {
            const dat = e.target.files[0];
            setFile6(dat);
            state.icon4 = dat;
        }
        else if (e.target.name === 'icon5') {
            const dat = e.target.files[0];
            setFile7(dat);
            state.icon5 = dat;
        }
    }

    const [state, setState] = useState({
        category_name: "",
        // icon: "",
        image: "",
        form_field: "",
        faq_field: "",
        icon_field: "",
        full_field: "",
        status: "1",
        // ICON
        icon1: "",
        icon1Title: "",
        icon2: "",
        icon2Title: "",
        icon3: "",
        icon3Title: "",
        icon4: "",
        icon4Title: "",
        icon5: "",
        icon5Title: "",
    });

    const [error, setError] = useState("");

    const {
        category_name,
        // icon,
        image,
        status,
    } = state;

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // FIELD
    const changefieldHandler = (e) => {
        let { name, value } = e.target;
        setTempField({ ...tempField, [name]: value });
        console.log(tempField);
    }
    const fieldHandler = (identifier) => {
        if (identifier && tempField.field) {
            if (identifier === 'dropdown' || 'radio') {
                tempField.options = dropDownOptions;
                setFieldData([...fieldData, tempField]);
                setTempField({ type: "", field: "", options: [] })
                setDropDownOptions([]);

            }
            else {
                let finder = fieldData.filter(val => val === tempField.field)
                if (tempField.type === "" || tempField.field === "") {
                    setOpen(true);
                    setAlert({ sev: "error", content: "Please Fill Input Field !", });
                }
                else if (finder.length !== 0) {
                    setOpen(true);
                    setAlert({ sev: "error", content: "This Field is already exist !", });
                }
                else {
                    console.log(tempField)
                    setFieldData([...fieldData, tempField]);
                    setTempField({ type: "", field: "", options: [] })
                    console.log('Hello There', fieldData)
                }
            }
        }
        else {
            setOpen(true);
            setAlert({ sev: "error", content: "Please select and enter something !", });
        }
    }
    // FIELD
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


    // // FAQ FIELD
    const changefieldHandlerFaq = (e) => {
        let { name, value } = e.target;
        setTempFieldFaq({ ...tempFieldFaq, [name]: value });
    }
    const fieldHandlerFaq = () => {
        let finder = fieldDataFaq.filter(val => val === tempFieldFaq)
        if (tempFieldFaq.qusetion === "" || tempFieldFaq.answer === "") {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Input Field !", });

        }
        else if (finder.length !== 0) {
            setOpen(true);
            setAlert({ sev: "error", content: "This Field is already exist !", });
        }
        else {
            console.log(tempFieldFaq)
            setFieldDataFaq([...fieldDataFaq, tempFieldFaq]);
            setTempFieldFaq({ question: "", answer: "" })
        }
    }
    // FAQF IELD
    const fieldFilterFaq = (data) => {
        console.log(fieldDataFaq)
        const filterFaq = fieldDataFaq.filter((valFaq) => {
            if (valFaq !== data) {
                return valFaq;
            }
        })
        console.log(filterFaq)
        setFieldDataFaq(filterFaq)
    }




    // // ICON FIELD
    const changefieldHandlerIcon = (e) => {
        setTempFieldIcon(e.target.value);
    }
    const fieldHandlerIcon = () => {
        if (tempFieldIcon === "") {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Input Field !", });
        }
        else {
            console.log(tempFieldIcon)
            setFieldDataIcon([...fieldDataIcon, tempFieldIcon]);
            setTempFieldIcon("")
        }
    }
    // ICON IELD
    const fieldFilterIcon = (data) => {
        console.log(fieldDataIcon)
        const filterIcon = fieldDataIcon.filter((valIcon) => {
            if (valIcon !== data) {
                return valIcon;
            }
        })
        console.log(filterIcon)
        setFieldDataIcon(filterIcon)
    }


    // // FULL FIELD
    const changefieldHandlerFull = (e) => {
        setTempFieldFull(e.target.value);
    }
    const fieldHandlerFull = () => {
        let finder = fieldDataFull.filter(val => val === tempFieldFull)
        if (tempFieldFull === "") {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Input Field !", });
        }
        else if (finder.length !== 0) {
            setOpen(true);
            setAlert({ sev: "error", content: "This Field is already exist !", });
        }
        else {
            console.log(tempFieldFull)
            setFieldDataFull([...fieldDataFull, tempFieldFull]);
            setTempFieldFull("")
        }
    }
    // FULL IELD
    const fieldFilterFull = (data) => {
        console.log(fieldDataFull)
        const filterFull = fieldDataFull.filter((valFull) => {
            if (valFull !== data) {
                return valFull;
            }
        })
        console.log(filterFull)
        setFieldDataFull(filterFull)
    }

    // ERROR
    const handleSubmit = (e) => {
        e.preventDefault();
        // This code is used for file upload
        const formData = new FormData();
        formData.append("image", file1);
        // formData.append("icon", file2);
        // ICON
        formData.append("icon1", file3);
        formData.append("icon2", file4);
        formData.append("icon3", file5);
        formData.append("icon4", file6);
        formData.append("icon5", file7);

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }


        const allFields = [fieldData]
        let flatField = [].concat.apply([], allFields);
        flatField = JSON.stringify(flatField)
        state.form_field = flatField;

        // // FAQ FIEKD
        const allFieldsFaq = [fieldDataFaq]
        let flatFieldFaq = [].concat.apply([], allFieldsFaq);
        flatFieldFaq = JSON.stringify(flatFieldFaq)
        state.faq_field = flatFieldFaq;


        // // ICON FEILD
        const allFieldsIcon = [fieldDataIcon]
        let flatFieldIcon = [].concat.apply([], allFieldsIcon);
        flatFieldIcon = JSON.stringify(flatFieldIcon)
        state.icon_field = flatFieldIcon;

        // // FULL FEILD
        const allFieldsFull = [fieldDataFull]
        let flatFieldFull = [].concat.apply([], allFieldsFull);
        flatFieldFull = JSON.stringify(flatFieldFull)
        state.full_field = flatFieldFull;

        console.log(state)

        if (!category_name) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Category !", });
        }
        else if (!file1) {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Image !", });
        }
        // else if (!file2) {
        //     setOpen(true);
        //     setAlert({ sev: "error", content: "Please Select Icon !", });
        // }
        else {
            // This code is used for file upload
            axios.post(`${process.env.REACT_APP_IPURL}/admin/category`, formData, config)
                .then(response => {
                    console.log(response);
                    state.image = response.data.active_url;
                    // state.icon = response.data.inactive_url;
                    // icon
                    state.icon1 = response.data.iconClass1;
                    state.icon2 = response.data.iconClass2;
                    state.icon3 = response.data.iconClass3;
                    state.icon4 = response.data.iconClass4;
                    state.icon5 = response.data.iconClass5;
                    // Green Snackbar
                    setOpen(true);
                    setAlert({ sev: "success", content: "Added Successfully", });
                    setError("");
                    dispatch(addCategory(state));
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
            navigate("/Category");
        }
    };

    const dropDownOptionHandler = () => {
        let finder = dropDownOptions.filter(val => val === tempDropDownOptions)
        if (tempDropDownOptions === "") {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Input Field !", });
        }
        else if (finder.length !== 0) {
            setOpen(true);
            setAlert({ sev: "error", content: "This Option is already exist !", });
        }
        else {
            setDropDownOptions([...dropDownOptions, tempDropDownOptions]);
            setTempDropDownOptions('')
        }
    }

    return (
        <div className="container">
            <div className="column">
                <div className="col-12 ">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create New Category</h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Category Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" onChange={onChangeHandler} name="category_name" placeholder='Category Name' />
                                        </div>
                                    </div>

                                    {/* <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Banner</label>
                                        <div className="col-sm-9">
                                            <input type="file" className="form-control" onChange={fileHandler} name="icon" />
                                            <p>Recommended Image Size (1350px X 420px)</p>
                                        </div>
                                    </div> */}

                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label" for="exampleInputEmail1">Image</label>
                                        <div className="col-sm-9">
                                            <input type="file" className="form-control" onChange={fileHandler} name="image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                <Link to="/Category" class="btn btn-light">Cancel</Link>
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

                <br /><br />
                {/* Dynamic Field Addon*/}
                <div className="col-10 mx-auto mb-3">

                    <div class="easytabs">
                        <div class="easytabs-menu">
                            <div class="easytab-toggler" data-easytab=".easytab-1" onClick={() => setTabFilter(1)} style={{ background: tabFilter === 1 ? '#fff' : '#a8b1bd' }}>
                                Fields
                            </div>
                            <div class="easytab-toggler active" data-easytab=".easytab-2" onClick={() => setTabFilter(2)} style={{ background: tabFilter === 2 ? '#fff' : '#a8b1bd' }} >
                                FAQ
                            </div>
                            <div class="easytab-toggler" data-easytab=".easytab-3" onClick={() => setTabFilter(3)} style={{ background: tabFilter === 3 ? '#fff' : '#a8b1bd' }}>
                                Full specification(Icon)
                            </div>
                            <div class="easytab-toggler" data-easytab=".easytab-3" onClick={() => setTabFilter(4)} style={{ background: tabFilter === 4 ? '#fff' : '#a8b1bd' }} >
                                Full specification
                            </div>
                        </div>


                        <div class="easytab easytab-1" style={{ display: tabFilter === 1 ? 'block' : 'none' }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h4 className="card-title">Form Fields</h4>

                                    <div className="row">
                                        <div className="col-md-12">

                                            {fieldData && fieldData.map((val, i) => {
                                                return <div class="form-group row" key={i}>
                                                    <div className='col-2 d-flex align-items-center'>
                                                        <h5>Type : {val.type}</h5>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control" name={val} placeholder={val} value={val.field} disabled />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="col-sm-3 btn btn-primary" onClick={() => fieldFilter(val)}>x</button>
                                                    </div>
                                                </div>
                                            })}
                                            <div class="form-group row">
                                                <div className="col-2">
                                                    <select className='form-control' name="type" onChange={changefieldHandler} value={tempField.type}>
                                                        <option value="">Select Type</option>
                                                        <option value="text">String</option>
                                                        <option value="number">Number</option>
                                                        <option value="dropdown">Dropdown</option>
                                                        <option value="radio">Radio</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    {tempField.type === 'dropdown' || tempField.type === 'radio' ? <div className='row'>
                                                        <div className='col-5'>
                                                            <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandler} value={tempField.field} />
                                                        </div>
                                                        <div className="col-6">
                                                            <input type="text" className="form-control" name="options" placeholder='Options' value={tempDropDownOptions} onChange={(e) => { setTempDropDownOptions(e.target.value) }} />
                                                        </div>
                                                        <div className="col-1 d-flex align-items-center " id="cat-side">
                                                            <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={dropDownOptionHandler}><AddIcon id="cat-icon" /></button>
                                                        </div>
                                                    </div> : <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandler} value={tempField.field} />

                                                    }
                                                </div>
                                                <button className="col-sm-3 btn btn-primary ml-3" onClick={() => fieldHandler(tempField.type)}>+</button>
                                            </div>
                                            {tempField.type === 'dropdown' || tempField.type === 'radio' ? <><h2>Options</h2>
                                                {dropDownOptions && dropDownOptions.map((cur, i) => {
                                                    return <div className="row mx-auto mb-3 mt-3" key={i}>
                                                        <div className="col-6">
                                                            <input type="text" className="form-control" value={cur} readOnly />
                                                        </div>
                                                        <div className="col-sm-2 ml-1">
                                                            <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => { setDropDownOptions(dropDownOptions.filter(val => val !== cur)) }}><CancelIcon id="cat-icon" /></button>
                                                        </div>
                                                    </div>
                                                })}</> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="easytab easytab-1" style={{ display: tabFilter === 1 ? 'block' : 'none' }}>
                            <div className="card" >
                                <div className="card-body">
                                    <h4 className="card-title">Form Fields</h4>

                                    <div className="row">
                                        <div className="col-md-12">

                                            {fieldData && fieldData.map((val, i) => {
                                                return <div class="form-group row" key={i}>
                                                    <div className='col-2 d-flex align-items-center'>
                                                        <h5>Type : {val.type}</h5>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control" name={val} placeholder={val} value={val.field} disabled />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="col-sm-3 btn btn-primary" onClick={() => fieldFilter(val)}>x</button>
                                                    </div>
                                                </div>
                                            })}

                                            <div class="form-group row">
                                                <div className="col-2">
                                                    <select className='form-control' name="type" onChange={changefieldHandler} value={tempField.type}>
                                                        <option value="">Select Type</option>
                                                        <option value="text">String</option>
                                                        <option value="number">Number</option>

                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandler} value={tempField.field} />
                                                </div>
                                                <button className="col-sm-3 btn btn-primary" onClick={fieldHandler}>+</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div class="easytab easytab-2 active" style={{ display: tabFilter === 2 ? 'block' : 'none' }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Faqs</h4>

                                    <div className="row">
                                        <div className="col-md-12">

                                            {fieldDataFaq && fieldDataFaq.map((valFaq, i) => {
                                                return <div class="form-group row" key={i}>
                                                    <div className="col-sm-9">
                                                        <label class="col-form-label p-0">Question</label>

                                                        <input type="text" className="form-control" name="question" placeholder='Question' value={valFaq.question} onChange={changefieldHandlerFaq} disabled />
                                                        <label class="col-form-label mt-3 p-0">Answer</label>

                                                        <textarea className="form-control" id="exampleTextarea1" rows="5" placeholder="Answer" value={valFaq.answer} onChange={changefieldHandlerFaq} name="answer" disabled></textarea>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="col-sm-3 btn btn-primary" onClick={() => fieldFilterFaq(valFaq)}>x</button>
                                                    </div>
                                                </div>
                                            })}

                                            <div class="form-group row">
                                                <div className="col-sm-12">
                                                    <label class="col-form-label p-0">Question</label>

                                                    <input type="text" className="form-control" name="question" placeholder='Question' value={tempFieldFaq.question} onChange={changefieldHandlerFaq} />
                                                    <label class="col-form-label mt-3 p-0">Answer</label>

                                                    <textarea className="form-control" id="exampleTextarea1" rows="5" placeholder="Answer" value={tempFieldFaq.answer} onChange={changefieldHandlerFaq} name="answer"></textarea>
                                                </div>
                                                <button className="col-sm-2 mx-auto btn btn-primary mt-4" onClick={fieldHandlerFaq}>+</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="easytab easytab-3" style={{ display: tabFilter === 3 ? 'block' : 'none' }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">full specification (Icons)</h4>
                                    <p>For Icons Take refrence <span><a href="https://www.flaticon.com/uicons" target="_blank" style={{ color: "tomato" }}>Visit Icons</a></span></p>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="accordion-item-body-content">
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon 1</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="icon1" onChange={fileHandler} />
                                                        <input type="text" className="form-control" placeholder='Icon 1 Title' name="icon1Title" onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon 2</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="icon2" onChange={fileHandler} />
                                                        <input type="text" className="form-control" placeholder='Icon 2 Title' name="icon2Title" onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon 3</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="icon3" onChange={fileHandler} />
                                                        <input type="text" className="form-control" placeholder='Icon 3 Title' name="icon3Title" onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon 4</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="icon4" onChange={fileHandler} />
                                                        <input type="text" className="form-control" placeholder='Icon 4 Title' name="icon4Title" onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon 5</label>
                                                    <div className="col-sm-9">
                                                        <input type="file" className="form-control" name="icon5" onChange={fileHandler} />
                                                        <input type="text" className="form-control" placeholder='Icon 5 Title' name="icon5Title" onChange={onChangeHandler} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="easytab easytab-4" style={{ display: tabFilter === 4 ? 'block' : 'none' }}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">full specification</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {fieldDataFull && fieldDataFull.map((valFull, i) => {
                                                return <div class="form-group row" key={i}>
                                                    <div className="col-sm-9">
                                                        <input type="text" className="form-control" name={valFull} placeholder={valFull} onChange={onChangeHandler} disabled />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button className="col-sm-3 btn btn-primary" onClick={() => fieldFilterFull(valFull)}>x</button>
                                                    </div>
                                                </div>
                                            })}
                                            <div class="form-group row">
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandlerFull} value={tempFieldFull} />
                                                </div>
                                                <button className="col-sm-3 btn btn-primary" onClick={fieldHandlerFull}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddCategoryList