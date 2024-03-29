import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCategory, loadCategoryes } from '../../Actions/categoryAction';
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
import { deleteAd, loadAds } from '../../Actions/adsAction';
import { ExportCSV } from '../Common/Exports/Exports';

const AdsPanel = () => {
    var i = 1;
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
    const { ads } = useSelector(state => state.adData);
    useEffect(() => {
        dispatch(loadAds());
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
        dispatch(deleteAd(data));
        setPop(false);
        setOpen(true);
    }


    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = ads.filter((data) => {
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
                    {state.category_name}
                </td>
                <td>
                    <img src={`${process.env.REACT_APP_IPURL}${state.icon}`} alt="ads" />
                </td>
                <td>
                    {state.adName}
                </td>
                {/* <td>
                    {state.buttonText}
                </td> */}

                <td>
                    <label class="badge badge-info">{state.status_name}</label>
                </td>
                <td>
                    <Link to={`/Ads/edit/${state.id}`} class="action-button badge badge-success">Edit</Link>
                    <button
                        class="action-button badge badge-danger"
                        onClick={() => {
                            handleClickOpen(state.id);
                        }}>Delete</button>
                </td>
            </tr>
        );
    });

    finder = ads.filter((val) => {
        if (searchVal === "") {
            return val;
        } else if (
            val.id == searchVal || val.name.toLowerCase().includes(searchVal.toLowerCase()) || val.status == searchVal
        ) {
            return val;
        }
    })

    const pageCount = Math.ceil(ads.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    // DOWNLOAD IN EXCEL
    const fileName = 'ads-Excel'
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Ads List <small>Dashboard</small></h4>
                        <Link
                            class="action-button badge badge-primary"
                            to="/ads/create">Add Ads</Link>
                        <button className="action-button badge badge-primary">
                            {/* <FontAwesomeIcon icon="download" /> */}
                            <ExportCSV csvData={ads} fileName={fileName} />
                        </button>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th>
                                            Image
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        {/* <th>
                                            Link
                                        </th> */}
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

export default AdsPanel