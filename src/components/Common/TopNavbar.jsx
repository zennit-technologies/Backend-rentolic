import React from 'react'
import { Link } from 'react-router-dom';
import { auth } from "../../firebase";

const TopNavbar = () => {
    const logOutFUnction = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem("tokenOtp");
            localStorage.removeItem("loggedInOtp");
            localStorage.removeItem("loggedIn");
            window.location.reload(false);
        } catch (error) {
            console.log("error signing out: ", error);
        }
    };
    return (
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <Link className="navbar-brand brand-logo mr-5" to="/"><img src="/images/rento/logo1.jpg" className="mr-2"
                    alt="logo" /></Link>
                <Link className="navbar-brand brand-logo-mini" to="/"><img src="/images/logo-mini.svg" alt="logo" /></Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="icon-menu"></span>
                </button>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                        <div className='d-flex'>
                            <a href="https://rentolic.com" target="_blank" className='d-flex'>
                                <i className="icon-bell mx-0"></i>
                                <h3>
                                    View Profile
                                </h3>
                            </a>
                        </div>
                    </li>
                    <li>
                        {/* <button >Logout</button> */}
                    </li>
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                            <img src="images/faces/face28.jpg" alt="profile" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <Link to="/admin-profile" className="dropdown-item">
                                <i className="ti-settings text-primary"></i>
                                Profile
                            </Link>
                            <button className="dropdown-item" onClick={logOutFUnction} >
                                <i className="ti-power-off text-primary"></i>
                                Logout
                            </button>
                        </div>
                    </li>

                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                    data-toggle="offcanvas">
                    <span className="icon-menu"></span>
                </button>
            </div>
        </nav>
    )
}

export default TopNavbar