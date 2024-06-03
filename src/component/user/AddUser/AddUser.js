import React, { useState, useEffect, Fragment } from 'react';
// import './AddUser.css'
import { useDispatch,useSelector } from 'react-redux';
import { addUser, getAllDesignation,getAllRole } from '../../../actions/userAction';
import Loader from '../../Loader/Loader';


export default function Signup() {
  const {loading,allRole,allDesignation, message,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone_No, setPhone_no] = useState('');
  const [selectedRoleValue, setSelectedRoleValue] = useState('');
  const [selectedDesignationValue, setSelectedDesignationValue] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [selectedDesignationId, setSelectedDesignationId] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhone_NoChange = (e) => {
    setPhone_no(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleDropdownChange = (e) => {
    setSelectedRoleValue(e.target.value);
  };
  const handleDesignationDropdownChange = (e) => {
    setSelectedDesignationValue(e.target.value);
  };
  const getIds = async () => {
    allRole.forEach((element) => {
      if (element.name === selectedRoleValue) {
        setSelectedRoleId(element._id);
      }
    })
    allDesignation.forEach((element) => {
      if (element.name === selectedDesignationValue) {
        setSelectedDesignationId(element._id);
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUser(name,email,password,phone_No,selectedDesignationId,selectedRoleId))
  }

  useEffect(() => {
    dispatch(getAllRole())
    dispatch(getAllDesignation());
  }, []);
  useEffect(() => {
    getIds()
  }, [selectedRoleValue,selectedDesignationId])

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ):(
        <div className='body'>
        <div className="container">
          <h1 className='heading'>Add User</h1>
          <form onSubmit={handleSubmit}>
            <input className='input' required value={name} onChange={handleNameChange} placeholder='Enter Your Name' />
            <input className='input' required value={email} type='text' onChange={handleEmailChange} placeholder='Enter email' />
            <input className='input' required value={password} type='text' onChange={handlePasswordChange} placeholder='Enter password' />
            <input className='input' required value={phone_No} type='number' onChange={handlePhone_NoChange} placeholder='Enter Phone Number' />
            <select className='input' value={selectedDesignationValue} onChange={handleDesignationDropdownChange}>
              <option value="">Select Designation</option>
              {allDesignation?.map((element) => (
                <option key={element._id} value={element.name}>
                  {element.name}
                </option>
              ))}
            </select>
            <select className='input' value={selectedRoleValue} onChange={handleRoleDropdownChange}>
              <option value="">Select Role</option>
              {allRole?.map((element) => (
                <option key={element._id} value={element.name}>
                  {element.name}
                </option>
              ))}
            </select>
            {/* <input className='input' required value={role_Id} type='text' onChange={handleRole_IdChange} placeholder='Enter Role_Id' /> */}
            <button className='button' type='submit'>Add User</button>
          </form>
          {error && <div className="error-message">{typeof error === 'object' ? JSON.stringify(error) : error}</div>}
        </div>
      </div>
  
      )}
    </Fragment>
        );
}
