import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './navigation/navigation';
import Login from './component/login/Login';
import { loadUser } from './actions/userDataAction';
import Loader from './component/Loader/Loader'; // Make sure you have this component

export default function App() {
  const { loading1, isAuthenticated } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    dispatch(loadUser()).finally(() => setAuthChecked(true));
  }, [dispatch]);

  if (loading1 || !authChecked) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="*" element={<Navigation />} />
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}
