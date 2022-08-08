import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteUsers, loadUsers } from '../../Actions/usersAction';

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
import NotFound from '../Common/NotFound/NotFound';
import ReactPaginate from 'react-paginate';
import { ExportCSV } from '../Common/Exports/Exports';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UsersList = () => {
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
    const { users } = useSelector(state => state.usersData);
    useEffect(() => {
        dispatch(loadUsers());
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
        dispatch(deleteUsers(data));
        setPop(false);
        setOpen(true);
    }


    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = users.filter((data) => {
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
                    {state.fullName}
                </td>
                <td>
                    {state.email}
                </td>
                <td>
                    {state.phone}
                </td>
                <td>
                    <label class="badge badge-info">{state.status_name}</label>
                </td>
                <td>
                    <Link to={`/Users/Edit/${state.id}`} class="action-button badge badge-success">Edit</Link>
                    <button
                        class="action-button badge badge-danger"
                        onClick={() => {
                            handleClickOpen(state.id);
                        }}>Delete</button>
                </td>
            </tr>
        );
    });

    finder = users.filter((val) => {
        if (searchVal === "") {
            return val;
        } else if (
            val.id == searchVal || val.name.toLowerCase().includes(searchVal.toLowerCase()) || val.status == searchVal
        ) {
            return val;
        }
    })

    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    // DOWNLOAD IN EXCEL
    const fileName = 'users-Excel'
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Users List <small>Dashboard</small></h4>
                        {/* <p className="card-description">
                        Add className <code>.table-striped</code>
                    </p> */}
                        <button className="action-button badge badge-primary">
                            {/* <FontAwesomeIcon icon="download" /> */}
                            <ExportCSV csvData={users} fileName={fileName} />
                        </button>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Full Name
                                        </th>
                                        <th>
                                            User Email
                                        </th>
                                        <th>
                                            User Phone
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
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersList