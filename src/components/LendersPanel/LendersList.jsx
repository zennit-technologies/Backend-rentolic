import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadLanders } from '../../Actions/lenderAction';
import { ExportCSV } from '../Common/Exports/Exports';

import NotFound from '../Common/NotFound/NotFound';

const LendersList = () => {
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
    const { lenders } = useSelector(state => state.lenderData);
    useEffect(() => {
        dispatch(loadLanders());
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
        // dispatch(deleteLender(data));
        setPop(false);
        setOpen(true);
    }


    //PAGINATION
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = lenders.filter((data) => {
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
                    {state.city_name}
                </td>
                <td>
                    {state.lender_name}
                </td>
                <td>
                    {state.lender_email}
                </td>
                <td>
                    {state.lender_phone}
                </td>
                <td>
                    {state.status_name}
                </td>
                <td>
                    <label class="badge badge-info">{state.status_name}</label>
                </td>
                <td>
                    <Link to={`/Lenders/Edit/${state.id}`} class="action-button badge badge-success">Edit</Link>
                </td>
            </tr>
        );

    });

    finder = lenders.filter((val) => {
        if (searchVal === "") {
            return val;
        } else if (
            val.id == searchVal || val.name.toLowerCase().includes(searchVal.toLowerCase()) || val.status == searchVal
        ) {
            return val;
        }
    })

    const pageCount = Math.ceil(lenders.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    // DOWNLOAD IN EXCEL
    const fileName = 'lenders-Excel'
    return (
        <div className="container">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Lander List <small>Dashboard</small></h4>
                        {/* <p className="card-description">
                        Add cla
                        ssName <code>.table-striped</code>
                    </p> */}
                        <button className="action-button badge badge-primary">
                            {/* <FontAwesomeIcon icon="download" /> */}
                            <ExportCSV csvData={lenders} fileName={fileName} />
                        </button>
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
                                            Lender Name
                                        </th>
                                        <th>
                                            Lender Email
                                        </th>
                                        <th>
                                            Lender Phone
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LendersList