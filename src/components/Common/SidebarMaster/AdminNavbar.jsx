import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    const [value, setValue] = useState('none');
    // const toggle = (data) => {
    //     if (value === 'none') {
    //         setValue('block')
    //     }
    //     else {
    //         setValue('none');
    //     }
    // }
    return (
        <li className="nav-item" >
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic" onClick={() => { setValue(1) }}>
                <i className="icon-head menu-icon"></i>
                <span className="menu-title">Admin</span>
                <i className="menu-arrow"></i>
            </a>
 
            <div className="collapse" id="ui-basic"  style={{ display: value === 1 ? 'block' : 'none' }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">List Admin</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/admin/create">Add Admin</Link>
                    </li> */}
                </ul>
            </div>
        </li>
    )
}

export default AdminNavbar