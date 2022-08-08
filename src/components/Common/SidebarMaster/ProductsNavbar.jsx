import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductsNavbar = () => {
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
                <span className="menu-title">Products</span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic" style={{ display: value }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Products">Products List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Product/Create">Add Product</Link>
                    </li>
                   
                </ul>
            </div>
        </li>
    )
}

export default ProductsNavbar