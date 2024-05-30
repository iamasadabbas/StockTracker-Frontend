import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './component/navigation';
import Login from './component/login/Login';
import { loadUser } from './component/actions/userDataAction';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(loadUser());
  },[])
  return (
    <Router>
      <Routes>
        
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Router>
  );
}
