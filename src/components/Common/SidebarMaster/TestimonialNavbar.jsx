import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TestimonialNavbar = () => {
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
                <i className="icon-layout menu-icon"></i>
                <span className="menu-title">Premium/verified</span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic" style={{ display: value }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Premium-verified">Premium/verified List</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/Premium-verified/create">Add Premium/verified</Link>
                    </li> */}
                </ul>
            </div>
        </li>
    )
}

export default TestimonialNavbar