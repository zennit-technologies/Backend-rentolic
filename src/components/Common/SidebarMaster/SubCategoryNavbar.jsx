import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SubCategory = () => {
    const [accord, setAccord] = useState('none');
    return (
        <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="ui-basic" onClick={() => { setAccord(2) }}>
                <i className="icon-layout menu-icon"></i>
                <span className="menu-title">Renting </span>
                <i className="menu-arrow"></i>
            </a>

            <div className="collapse" id="ui-basic"  style={{ display: accord === 2 ? 'block' : 'none' }}>
                <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Category">
                            <span className="menu-title">Category</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/Sub-Category">
                            <span className="menu-title">Sub Category</span>
                        </Link>
                    </li>

                    {/*  */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/City">
                            <span className="menu-title">City</span>
                        </Link>
                    </li>
                    {/*  */}

                    <li className="nav-item">
                        <Link className="nav-link" to="/Products">
                            <span className="menu-title">Products</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default SubCategory