import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../Common/NotFound/NotFound';
import ReactPaginate from "react-paginate";


// MUI Import
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { deleteProduct, loadProducts, updateProduct } from '../../Actions/productAction';
import { loadPendingProducts } from '../../Actions/pendingProductAction';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PendingProduct = () => {
    // RELOAD FUCTION
    function refreshPage() {
        window.location.reload(false);
    }

    // Snackbar Code
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ sev: '', content: '' });
    // MUI Alert Code 
    const [pop, setPop] = useState(false);
    const [check, setCheck] = useState([]);

    console.log(check);
    const [data, setData] = useState();
    const [action, setAction] = useState('');
    const [searchVal, setSearchVal] = useState("");
    let finder = 0;

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { pendingProducts } = useSelector(state => state.pendingProductData);
    useEffect(() => {
        dispatch(loadPendingProducts());
    }, []);
    // LOAD ACTIONS ENDS

    const handleClickOpen = (id) => {
        setPop(true);
        setData(id);
    };
    const handleClose = () => {
        setOpen(false);
        setPop(false);
    };
    const handleDelete = () => {
        dispatch(deleteProduct(data));
        setPop(false);
        setOpen(true);
    }

    const onChangeSelect = (event) => {
        if (event.target.value === '*' && event.target.checked === true) {
            setCheck(pendingProducts.map((curr) => {
                return document.getElementById(`checkbox${curr.id}`).checked = true, curr.id
            }
            ))

        }
        else if (event.target.value === '*' && event.target.checked === false) {
            check.map((curr) => {
                return document.getElementById(`checkbox${curr}`).checked = false;
            })
            setCheck([])

        }
        else if (event.target.checked === true) {
            setCheck([...check, parseInt(event.target.value)])
        }
        else if (event.target.checked === false) {
            document.getElementById("all_check").checked = false;
            setCheck(check.filter((curr) => curr !== parseInt(event.target.value)))

        }
    }

    const actionSubmit = (e) => {
        if (action === '1' && check.length > 0) {
            check.map((curr) => {
                let approved = { "is_approved": 1 }
                setOpen(true);
                setAlert({ sev: "success", content: "Done !", });
                dispatch(updateProduct(approved, curr))
                document.getElementById("all_check").checked = false;
            })
        }
        else if (action === '2' && check.length > 0) {
            check.map((curr) => {
                let approved = { "is_approved": 2 }
                setOpen(true);
                setAlert({ sev: "success", content: "Done !", });
                dispatch(updateProduct(approved, curr))
                document.getElementById("all_check").checked = false;
            })
        }
        else {
            setOpen(true);
            setAlert({ sev: "error", content: "Please Select Data !", });
        }
    }


    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = pendingProducts.filter((data) => {
        if (searchVal === "") {
            return data;
        } else if (
            data.id == searchVal || data.name.toLowerCase().includes(searchVal.toLowerCase()) || data.status == searchVal
        ) {
            return data;
        }
    }).slice(pagesVisited, pagesVisited + usersPerPage).map(state => {
        return (
            <tr>
                <td>
                    <input class="checkbox" id={`checkbox${state.id}`} type="checkbox" value={state.id} onClick={onChangeSelect} />
                </td>
                <td>
                    {state.id}
                </td>
                <td className='full_details'>
                    <li>{state.fullName}</li>
                    <li>{state.email}</li>
                    <li>{state.phone}</li>
                </td>
                <td>
                    {state.product_name}
                </td>

                <td>
                    <label class="badge badge-info">{state.status_name}</label>
                </td>
                <td>
                <a href={`https://rentolic.com/product/${state.product_name}/${state.id}`} target="_blank" className="action-button badge badge-success">View</a>
                    {/* <Link to={`/Pending-Product/edit/${state.id}`} class="action-button badge badge-success">Edit</Link> */}
                    <button
                        class="action-button badge badge-danger"
                        onClick={() => {
                            handleClickOpen(state.id);
                        }}>Delete</button>
                </td>
            </tr>
        );
    });

    finder = pendingProducts.filter((val) => {
        if (searchVal === "") {
            return val;
        } else if (
            val.id == searchVal || val.name.toLowerCase().includes(searchVal.toLowerCase()) || val.status == searchVal
        ) {
            return val;
        }
    })

    const pageCount = Math.ceil(pendingProducts.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9 m-0 p-0">

                                <h4 className="card-title">Pending Product List <small>Dashboard</small></h4>
                            </div>
                            <div className="col-2 d-flex align-items-center">

                                <select className="col-sm-8 form-control mr-2" value={action} onChange={(e) => setAction(e.target.value)}>
                                    <option value="">Select Action</option>
                                    <option value="1">Approved</option>
                                    <option value="2">Decline</option>
                                </select>
                                {/* <select className="col-sm-8 form-control mr-2" value={actionStatus} onChange={(e) => setAction(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="1">Approved</option>
                                    <option value="2">Decline</option>
                                </select> */}

                                <Stack spacing={2} sx={{ width: '100%' }}>

                                    <button className="btn btn-primary" onClick={actionSubmit}>
                                        Submit
                                    </button>
                                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                            {alert.content}
                                        </Alert>
                                    </Snackbar>
                                </Stack>

                            </div>

                        </div>



                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            <input className="checkbox mr-2" id="all_check" type="checkbox" value='*' onClick={onChangeSelect} />
                                        </th>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Lender Deatils
                                        </th>

                                        <th>
                                            Product Name
                                        </th>

                                        <th>
                                            Status
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finder.length <= 0 ?
                                        <NotFound /> : displayUsers}
                                    <ReactPaginate
                                        previousLabel={"<<"}
                                        nextLabel={">>"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousbttn"}
                                        nextLinkClassName={"nextbttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                                </tbody>
                            </table>
                            <Dialog
                                open={pop}
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        Are you sure you want to delete ?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={handleDelete}>Yes</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingProduct