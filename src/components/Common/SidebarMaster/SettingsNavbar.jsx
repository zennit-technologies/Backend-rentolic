import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SettingsNavbar = () => {
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
                <span className="menu-title">Settings</span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic" style={{ display: value }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact-us-form">Contact us Form</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/slider">Slider</Link>
                    </li>
                    <li className="nav-item">
                        {/* <Link className="nav-link" to="/Admin/Contact-Us/Edit/:id">Content Us</Link> */}
                        <Link className="nav-link" to="/Admin/Contact-Us/Edit/1">Content Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Admin/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Admin/terms-condition">Terms & Condition</Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default SettingsNavbar