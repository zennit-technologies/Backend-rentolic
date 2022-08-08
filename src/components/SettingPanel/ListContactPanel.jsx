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
import { deleteProduct, loadProducts } from '../../Actions/productAction';
import { loadContacts } from '../../Actions/contactAction';

const ListContactPanel = () => {
    var i=1;
    // RELOAD FUCTION
    function refreshPage() {
        window.location.reload(false);
    }

    // Snackbar Code
    const [open, setOpen] = useState(false);
    // MUI Alert Code 
    const [pop, setPop] = useState(false);
    const [data, setData] = useState();
    const [searchVal, setSearchVal] = useState("");
    let finder = 0;

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { contacts } = useSelector(state => state.contactusData);
    useEffect(() => {
        dispatch(loadContacts());
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


    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = contacts.filter((data) => {
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
                    {i++}
                </td>
                <td>
                    {state.id}
                </td>
                <td>
                    {state.gmail}
                </td>
                <td>
                    <Link to={`/Admin/Contact-Us/Edit/${state.id}`} class="action-button badge badge-success">Edit</Link>
                    <button
                        class="action-button badge badge-danger"
                        onClick={() => {
                            handleClickOpen(state.id);
                        }}>Delete</button>
                </td>
            </tr>
        );
    });

    finder = contacts.filter((val) => {
        if (searchVal === "") {
            return val;
        } else if (
            val.id == searchVal || val.name.toLowerCase().includes(searchVal.toLowerCase()) || val.status == searchVal
        ) {
            return val;
        }
    })

    const pageCount = Math.ceil(contacts.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Product List <small>Dashboard</small></h4>
                        <Link
                        class="action-button badge badge-primary"
                        to="/Product/Create">Add Product</Link>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            City
                                        </th>
                                        <th>
                                            Product Name
                                        </th>
                                        <th>
                                            Product Description
                                        </th>
                                        <th>
                                            Amount (Hour)
                                        </th>
                                        <th>
                                            Amount (Days)
                                        </th>
                                        <th>
                                            Amount (Month)
                                        </th>
                                        <th>
                                            Min Amount (Hour)
                                        </th>
                                        <th>
                                            Min Amount (Days)
                                        </th>
                                        <th>
                                            Min Amount (Month)
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
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
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

export default ListContactPanel