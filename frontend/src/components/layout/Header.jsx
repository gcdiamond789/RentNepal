import React, { Fragment } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import profile from "/images/profile.png" 

import { logout } from "../../actions/userActions";

const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    // const {user} = useSelector((state)=> state.auth);
    const {user, loading} = useSelector((state)=> state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.');
    }
    
  return (
    <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img src="/images/RentNepalLogo.png" width={30}/>
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">  

                {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url || profile}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Fragment>
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    </Fragment>
                                )}
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/"  onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>


                        </div>

                    ) : !loading && <Link to="/lgn" className="btn ml-4" id="login_btn">Login</Link>}

                
            </div>
        </nav>
    </Fragment>
  )
}

export default Header