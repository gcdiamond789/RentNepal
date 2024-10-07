import React, {useState, useEffect, Fragment} from 'react';
import {Link, useNavigate} from "react-router-dom";

import Loader from "../layout/Loader/";
import MetaData from "../layout/MetaData";

import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {login, clearErrors, loadUser} from '../../actions/userActions';




const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {isAuthenticated, error, loading, user} = useSelector(state => state.auth); 


    useEffect(() => {
        if (isAuthenticated){
            navigate('/')
        }

        if (error){
            if (error !== "Please login to view the resources"){
                alert.error(error);
            }
            
            dispatch(clearErrors());
        }
    },[dispatch, alert, isAuthenticated, error])


    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(login(email, password))
        dispatch(loadUser());
    }
  return (
      <Fragment>
          {loading ? <Loader /> : (
              <Fragment>
                  <MetaData title={"Login"} />

                  <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div>
              </Fragment>
          )}
      </Fragment>
  )
}

export default Login