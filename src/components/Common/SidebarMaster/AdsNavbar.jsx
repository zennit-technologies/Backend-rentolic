import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdsNavbar = () => {
    const [value, setValue] = useState('none');
    const toggle = (data) => {
        if (value === 'none') {
            setValue('block')
        }
        else {
            setValue('none');
        }
    }
    return (
        <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic" onClick={() => toggle(value)}>
                <i className="icon-head menu-icon"></i>
                <span className="menu-title">Ads</span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic" style={{ display: value }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/ads">List Ads</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ads/create">Add Ads</Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default AdsNavbar