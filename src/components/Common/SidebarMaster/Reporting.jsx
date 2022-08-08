import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Reporting = () => {
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
                <i className="icon-bar-graph menu-icon"></i>
                <span className="menu-title">Report & Charts</span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic" style={{ display: value }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/product-views-report">Products Report</Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default Reporting