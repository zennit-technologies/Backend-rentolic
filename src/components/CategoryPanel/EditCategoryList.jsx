import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleCategory, updateCategory } from '../../Actions/categoryAction';

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditCategoryList = () => {
    // Snackbar Code 
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    const [accord, setAccord] = useState(1);
    const [dropDownOptions, setDropDownOptions] = useState([])
    const [tempDropDownOptions, setTempDropDownOptions] = useState('')

    const [tempSelection, setTempSelection] = useState('');

    // these variables are use to manipulate data
    const [editCategoryField, setEditCategoryField] = useState('');
    const [editCategoryFieldId, setEditCategoryFieldId] = useState('');

    // these variables are use to manipulate data
    const [editCategoryFaq, setEditCategoryFaq] = useState('');
    const [editCategoryFaqId, setEditCategoryFaqId] = useState('');

    // these variables are use to manipulate data
    const [editCategoryFull, setEditCategoryFull] = useState('');
    const [editCategoryFullId, setEditCategoryFullId] = useState('');

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
    const { category } = useSelector((state) => state.categoryData);
    console.log(category)
    useEffect(() => {
        dispatch(getSingleCategory(id))
    }, [])

    const [state, setState] = useState({
        category_name: "",
        icon: "",
        image: "",
        status: "",
    });
    const {
        category_name,
        icon,
        image,
        status,
    } = state;

    const [fieldData, setFieldData] = useState([]);
    // console.log(fieldData)
    const [tempField, setTempField] = useState({ type: "", field: "" });

    // faq field
    const [fieldDataFaq, setFieldDataFaq] = useState([]);
    const [tempFieldFaq, setTempFieldFaq] = useState({ question: "", answer: "" });

    // icon field
    const [fieldDataIcon, setFieldDataIcon] = useState([]);
    const [tempFieldIcon, setTempFieldIcon] = useState("");

    // full field
    const [fieldDataFull, setFieldDataFull] = useState([]);
    const [tempFieldFull, setTempFieldFull] = useState("");

    useEffect(() => {
        setState({ ...category })
        if (state.category_name !== '') {
            setFieldData(JSON.parse(category.form_field))
            setFieldDataFaq(JSON.parse(category.faq_field))
            setFieldDataIcon(JSON.parse(category.icon_field))
            setFieldDataFull(JSON.parse(category.full_field))
        }
    }, [category])


    // FIELD
    const changefieldHandler = (e) => {
        let { name, value } = e.target;
        setTempField({ ...tempField, [name]: value });
    }
    const fieldHandler = (identifier) => {
        if (identifier === 'dropdown' || 'radio') {
            tempField.options = dropDownOptions;
            setFieldData([...fieldData, tempField]);
            setTempField({ type: "", field: "", options: [] })
            setDropDownOptions([]);

        }
        else {
            let finder = fieldData.filter(val => val === tempField)
            if (tempField.type === "" || tempField.field === "") {
                setOpen(true);
                setAlert({ sev: "error", content: "Please Fill Input Field !", });
            }
            else if (finder.length !== 0) {
                setOpen(true);
                setAlert({ sev: "error", content: "This Field is already exist !", });
            }
            else {
                // console.log(tempField)
                setFieldData([...fieldData, tempField]);
                setTempField({ type: "", field: "" })
            }

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

    // for submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !category_name
        ) {
            setError("Please enter all fields !");
        } else {
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


            dispatch(updateCategory(state, id));
            setOpen(true);
            setAlert({ sev: "success", content: "Update Successfully", });
            setState('')
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
            navigate("/Category");
        }
    };

    const editField = (val, i, id) => {
        if (id === 'field') {
            // document.getElementById("focusField").focus();

            setEditCategoryField(val)
            setEditCategoryFieldId(i)
        }
        else if (id === 'faq') {
            setEditCategoryFaq(val)
            setEditCategoryFaqId(i)
            // document.getElementById("focusFaq").focus();
        }
        else {
            setEditCategoryFull(val)
            setEditCategoryFullId(i)
            // document.getElementById("focusFull").focus();
        }
    }

    const editHandler = (ev, id) => {
        let { name, value } = ev.target;
        if (id === 'field') {
            setEditCategoryField({ ...editCategoryField, [name]: value });
        }
        else if (id === 'faq') {
            setEditCategoryFaq({ ...editCategoryFaq, [name]: value });
        }
        else {
            setEditCategoryFull(value);
        }
    }

    const editSubmit = (id) => {
        if (id === 'field') {
            fieldData[editCategoryFieldId] = Object.assign(editCategoryField);
            setEditCategoryField('')
        }
        else if (id === 'faq') {
            fieldDataFaq[editCategoryFaqId] = Object.assign(editCategoryFaq);
            setEditCategoryFaq('')
        }
        else {
            fieldDataFull[editCategoryFullId] = Object.assign(editCategoryFull);
            setEditCategoryFull('')
        }
    }

    const updateDropdownHandler = () => {
        let finder = editCategoryField.options.filter(val => val === tempSelection)
        if (tempSelection === "") {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Fill Input Field !", });
        }
        else if (finder.length !== 0) {
            setOpen(true);
            setAlert({ sev: "error", content: "This Option is already exist !", });
        }
        else {
            setEditCategoryField({ ...editCategoryField, options: [...editCategoryField.options, tempSelection] })
            setTempSelection('')
        }
    }

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
            console.log(dropDownOptions)
        }
    }


    return (
        <div className="container">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Category</h4>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Category Name</label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            onChange={onChangeHandler}
                                            name="category_name"
                                            value={category_name || ""}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Icon</label>
                                    <div className="col-sm-9">
                                        <input type="file"
                                            className="form-control"
                                            onChange={onChangeHandler}
                                            name="icon"
                                        // value={icon || ""} 

                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail1">Image</label>
                                    <div className="col-sm-9">
                                        <input type="file"
                                            className="form-control"
                                            onChange={onChangeHandler}
                                            name="image"
                                        // value={image || ""} 

                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3" htmlFor="exampleInputEmail1">Select Status</label>
                                    <select name="status" id="" className="col-sm-8 form-control" onChange={onChangeHandler} value={status || ""}>
                                        <option value="">Select</option>
                                        <option value="1">Active</option>
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
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        {fieldData && fieldData.map((val, i) => {
                                                            return <div className="form-group row" key={i}>
                                                                <div className='col-3 d-flex align-items-center'>
                                                                    <h5>Type : {val.type}</h5>
                                                                </div>
                                                                <div className="col-sm-7 m-0">
                                                                    <input type="text" className="form-control" placeholder={val.field} value={val.field} readOnly />
                                                                </div>
                                                                <div className="col-sm-1" id="cat-side">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => editField(val, i, 'field')}><EditIcon id="cat-icon" /></button>
                                                                </div>
                                                                <div className="col-sm-1 ml-1">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => fieldFilter(val)}><CancelIcon id="cat-icon" /></button>
                                                                </div>
                                                            </div>
                                                        })}


                                                        {editCategoryField ? <div className="form-group row">
                                                            <div className="col-3">
                                                                <select className='form-control' name="type" onChange={(ev) => { editHandler(ev, 'field') }} value={editCategoryField.type}>
                                                                    <option value="">Select Type</option>
                                                                    <option value="text">String</option>
                                                                    <option value="number">Number</option>
                                                                    <option value="dropdown">Dropdown</option>
                                                                    <option value="radio">Radio</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-sm-7">
                                                                <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={(ev) => { editHandler(ev, 'field') }} value={editCategoryField.field} id="focusField" />
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <button className="btn btn-primary" onClick={() => { editSubmit('field') }}><EditIcon /></button>
                                                            </div>

                                                            <div className="row mx-auto mb-3 mt-3">
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control" value={tempSelection} onChange={(e) => setTempSelection(e.target.value)} />
                                                                </div>
                                                                <div className="col-sm-2 ml-1">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={updateDropdownHandler} ><AddIcon id="cat-icon" /></button>
                                                                </div>
                                                            </div>
                                                            {editCategoryField.options && editCategoryField.options.map((cur, i) => {
                                                                return <div className="row mx-auto mb-3 mt-3" key={i}>
                                                                    <div className="col-8">
                                                                        <input type="text" className="form-control" value={cur} readOnly />
                                                                    </div>
                                                                    <div className="col-sm-2 ml-1">
                                                                        <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => { setEditCategoryField({ ...editCategoryField, options: editCategoryField.options.filter(val => val !== cur) }) }} ><CancelIcon id="cat-icon" /></button>
                                                                    </div>
                                                                </div>
                                                            })}
                                                        </div> : <div className="form-group row">
                                                            <div className="col-3">
                                                                <select className='form-control' name="type" onChange={changefieldHandler} value={tempField.type}>
                                                                    <option value="">Select Type</option>
                                                                    <option value="text">String</option>
                                                                    <option value="number">Number</option>
                                                                    <option value="dropdown">Dropdown</option>
                                                                    <option value="radio">Radio</option>
                                                                </select>
                                                            </div>

                                                            <div className="col-sm-7">
                                                                {tempField.type === 'dropdown' || tempField.type === 'radio' ? <div className='row'>
                                                                    <div className='col-12'>
                                                                        <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandler} value={tempField.field} />
                                                                    </div>

                                                                </div> : <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandler} value={tempField.field} />
                                                                }

                                                            </div>
                                                            <button className="col-sm-2 btn btn-primary" onClick={() => fieldHandler(tempField.type)}>+</button>
                                                        </div>
                                                        }
                                                        <div className="row mx-auto">

                                                            {tempField.type === 'dropdown' || tempField.type === 'radio' ? <><div className="col-7">
                                                                <input type="text" className="form-control" name="options" placeholder='Options' value={tempDropDownOptions} onChange={(e) => { setTempDropDownOptions(e.target.value) }} />
                                                            </div>
                                                                <div className="col-1 d-flex align-items-center " id="cat-side">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={dropDownOptionHandler}><AddIcon id="cat-icon" /></button>
                                                                </div>
                                                                {dropDownOptions && dropDownOptions.map((cur, i) => {
                                                                return <div className="row mx-auto mb-3 mt-3" key={i}>
                                                                    <div className="col-8">
                                                                        <input type="text" className="form-control" value={cur} readOnly />
                                                                    </div>
                                                                    <div className="col-sm-2 ml-1">
                                                                        <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => { setDropDownOptions([ ...dropDownOptions, dropDownOptions.filter(val => val !== cur) ])}} ><CancelIcon id="cat-icon" /></button>
                                                                    </div>
                                                                </div>
                                                            })}
                                                                </> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(2) }}>
                                            FAQ
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 2 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        {fieldDataFaq && fieldDataFaq.map((valFaq, i) => {
                                                            return <div className="form-group row" key={i}>
                                                                <div className="col-sm-9">
                                                                    <label className="col-form-label p-0">Question</label>

                                                                    <input type="text" className="form-control" name="question" placeholder='Question' value={valFaq.question} onChange={changefieldHandlerFaq} readOnly />
                                                                    <label className="col-form-label mt-3 p-0">Answer</label>

                                                                    <textarea className="form-control" id="exampleTextarea1" rows="5" placeholder="Answer" value={valFaq.answer} onChange={changefieldHandlerFaq} name="answer" readOnly></textarea>
                                                                </div>

                                                                <div className="col-sm-1 mt-4" id="cat-side">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => editField(valFaq, i, 'faq')}><EditIcon id="cat-icon" /></button>
                                                                </div>
                                                                <div className="col-sm-1 ml-1 mt-4">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => fieldFilterFaq(valFaq)}><CancelIcon id="cat-icon" /></button>
                                                                </div>
                                                            </div>
                                                        })}

                                                        {
                                                            editCategoryFaq ? <div className="form-group row d-block">
                                                                <div className="col-sm-12">
                                                                    <label className="col-form-label p-0" id="focusFaq">Question</label>

                                                                    <input type="text" className="form-control" name="question" placeholder='Question' value={editCategoryFaq.question} onChange={(ev) => { editHandler(ev, 'faq') }} />
                                                                    <label className="col-form-label mt-3 p-0">Answer</label>

                                                                    <textarea className="form-control" id="exampleTextarea1" rows="5" placeholder="Answer" value={editCategoryFaq.answer} onChange={(ev) => { editHandler(ev, 'faq') }} name="answer"></textarea>
                                                                </div>
                                                                <div className="col-span-12 mt-3 d-flex justify-content-center">
                                                                    <button className="btn btn-primary" onClick={() => { editSubmit('faq') }}><EditIcon /></button>
                                                                </div>
                                                            </div>
                                                                : <div className="form-group row">
                                                                    <div className="col-sm-12">
                                                                        <label className="col-form-label p-0">Question</label>

                                                                        <input type="text" className="form-control" name="question" placeholder='Question' value={tempFieldFaq.question} onChange={changefieldHandlerFaq} />
                                                                        <label className="col-form-label mt-3 p-0">Answer</label>

                                                                        <textarea className="form-control" id="exampleTextarea1" rows="5" placeholder="Answer" value={tempFieldFaq.answer} onChange={changefieldHandlerFaq} name="answer"></textarea>
                                                                    </div>
                                                                    <button className="col-sm-2 mx-auto btn btn-primary mt-4" onClick={fieldHandlerFaq}>+</button>
                                                                </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(3) }}>
                                            Full Specification (Icon)
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 3 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        {fieldDataIcon && fieldDataIcon.map((valIcon, i) => {
                                                            return <div className="form-group row" key={i}>
                                                                <div className="col-sm-9">
                                                                    <input type="text" className="form-control" name={valIcon} placeholder={valIcon} onChange={onChangeHandler} />
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className="col-sm-3 btn btn-primary" onClick={() => fieldFilterIcon(valIcon)}>x</button>
                                                                </div>
                                                            </div>
                                                        })}

                                                        <div className="form-group row">
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="field" placeholder='Field Name' value={tempFieldIcon} onChange={changefieldHandlerIcon} />
                                                            </div>
                                                            <button className="col-sm-3 btn btn-primary" onClick={fieldHandlerIcon}>+</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-item-header" onClick={() => { setAccord(4) }}>
                                            Full Specification
                                        </div>
                                        <div className="accordion-item-body" style={{ display: accord === 4 ? 'block' : 'none' }}>
                                            <div className="accordion-item-body-content">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        {fieldDataFull && fieldDataFull.map((valFull, i) => {
                                                            return <div className="form-group row" key={i}>
                                                                <div className="col-sm-9">
                                                                    <input type="text" className="form-control" name={valFull} placeholder={valFull} onChange={onChangeHandler} value={valFull} readOnly />
                                                                </div>
                                                                <div className="col-sm-1" id="cat-side">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => editField(valFull, i, 'full')}><EditIcon id="cat-icon" /></button>
                                                                </div>
                                                                <div className="col-sm-1 ml-1">
                                                                    <button className="col-sm-3 btn btn-primary rounded-circle m-0 pl-3 pr-3" onClick={() => fieldFilterFull(valFull)}><CancelIcon id="cat-icon" /></button>
                                                                </div>
                                                            </div>
                                                        })}
                                                        {
                                                            editCategoryFull ? <div className="form-group row">

                                                                <div className="col-sm-9">
                                                                    <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={(ev) => { editHandler(ev, 'full') }} value={editCategoryFull} id="focusFull" />
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <button className="btn btn-primary" onClick={() => { editSubmit('full') }}><EditIcon /></button>
                                                                </div>
                                                            </div> : <div className="form-group row">
                                                                <div className="col-sm-9">
                                                                    <input type="text" className="form-control" name="field" placeholder='Field Name' onChange={changefieldHandlerFull} value={tempFieldFull} />
                                                                </div>
                                                                <button className="col-sm-3 btn btn-primary" onClick={fieldHandlerFull}>+</button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                            <Link to="/Category" className="btn btn-light">Cancel</Link>
                            <button className="btn btn-primary mr-2" onClick={handleSubmit}>Submit</button>
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                    {alert.content}
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditCategoryList