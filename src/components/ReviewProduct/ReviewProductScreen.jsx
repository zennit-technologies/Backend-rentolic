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
import { deleteTestis, loadTestis } from '../../Actions/testiAction';
import { ExportCSV } from '../Common/Exports/Exports';
import { deleteReview, loadReview } from '../../Actions/reviewAction';

const ReviewProductScreen = () => {
    var i = 1;

    // Snackbar Code
    const [open, setOpen] = useState(false);
    // MUI Alert Code 
    const [pop, setPop] = useState(false);
    const [data, setData] = useState();
    const [searchVal, setSearchVal] = useState("");
    let finder = 0;

    // LOAD ACTIONS
    let dispatch = useDispatch();
    const { reviews } = useSelector(state => state.reviewData);
    useEffect(() => {
        dispatch(loadReview());
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
        dispatch(deleteReview(data));
        setPop(false);
        setOpen(true);
    }

    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = reviews.filter((data) => {
        if (searchVal === "") {
            return data;
        } else if (
            data.id == searchVal ||
            data.email.toLowerCase().includes(searchVal.toLowerCase()) ||
            data.name.toLowerCase().includes(searchVal.toLowerCase()) ||
            data.product_name.toLowerCase().includes(searchVal.toLowerCase()) ||
            data.review.toLowerCase().includes(searchVal.toLowerCase()) ||
            data.status == searchVal
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
                    {state.product_name.slice(0, 25)}...
                </td>
                <td>
                    {state.review.slice(0, 25)}..
                </td>
                <td>
                    {state.name}
                </td>
                <td>
                    {state.email}
                </td>
                <td>
                    <button
                        class="action-button badge badge-danger"
                        onClick={() => {
                            handleClickOpen(state.id);
                        }}>Delete</button>
                </td>
            </tr>
        );
    });

    finder = reviews.filter((val) => {
        if (searchVal === "") {
            return val;
        } else if (
            val.id == searchVal || val.name.toLowerCase().includes(searchVal.toLowerCase()) || val.status == searchVal
        ) {
            return val;
        }
    })

    const pageCount = Math.ceil(reviews.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    // DOWNLOAD IN EXCEL
    const fileName = 'reviews-Excel'
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Product Review List <small>Dashboard</small></h4>
                        <input type="text" className="search__input form-control border-transparent placeholder-theme-13 col-lg-6 mt-3 mb-3" placeholder="Search Review..." value={searchVal} onChange={(e) => { setSearchVal(e.target.value); }} />
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Product Name
                                        </th>
                                        <th>
                                            Review
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Email
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

export default ReviewProductScreen