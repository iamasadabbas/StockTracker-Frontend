import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useAlert } from 'react-alert';
import { login, clearError } from '../../actions/userDataAction';
import Loader from '../Loader/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated,message } = useSelector(
    (state) => state.userData
  );
  // console.log(message);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    } else if (message) {
      alert.info(message);
    }
     if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, message]);
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginContainer">

            <div className="LoginBox">
              <p className='login-tag'>LOGIN</p>
              <form className="loginForm" onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
