import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { login, clearError } from '../../actions/userDataAction';
import Loader from '../Loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Login.css';
import UIIT from './UIIT.jpg';

const Login = () => {
  console.log(process.env.BASE_URL);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.userData
  );

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <div className="imageContainer">
              <img src={UIIT} alt="Department" className="LoginImage" />
            </div>
            <div className="LoginBox">
              <p className="login-tag">LOGIN</p>
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="passwordVisibilityButton"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
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
