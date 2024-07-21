import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './navigation/navigation';
import Login from './component/login/Login';
import { loadUser } from './actions/userDataAction';
import Loader from './component/Loader/Loader'; 
import ResetPassword from './component/Profile/ResetPassword';
import ForgotPassword from './component/Profile/ForgotPassword.js'

export default function App() {
  const { loading1, isAuthenticated } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(loadUser()).finally(() => setAuthChecked(true));
  }, [dispatch]);

  if (loading1 || !authChecked) {
    return (
    <div style={{width:'100%',height:'100vh'}}>
      <Loader />
    </div>
    )
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="*" element={<Navigation />} />
        ) : (
          <>
          <Route path="/user/password/reset/:token" element={<ResetPassword />}/>
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
