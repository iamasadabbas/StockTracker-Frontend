import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = process.env.BASE_URL || 'http://localhost:3000';

export default function Signup() {
  // const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone_No, setPhone_no] = useState('');
  const [allRole, setAllRole] = useState([]);
  const [allDesignation, setAllDesignation] = useState([]);
  const [selectedRoleValue, setSelectedRoleValue] = useState('');
  const [selectedDesignationValue, setSelectedDesignationValue] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [selectedDesignationId, setSelectedDesignationId] = useState('');
  const [error, setError] = useState('');

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

    if (!name || !email || !password || !phone_No) {
      setError('Please enter all fields');
      return;
    }

    try {
      const response = await axios.post(`${URL}/user/registerUser`, {
        name: name,
        email: email,
        password: password,
        phone_no: phone_No,
        designation_id:selectedDesignationId,
        role_id: selectedRoleId
      });

      // console.log(response);

      if (response.status === 200) {
        alert('Registration successful');
        setEmail('');
        setPassword('');
        setName('');
        setPhone_no('');
        setSelectedRoleValue('');
        setSelectedDesignationValue('');
      } else if (response.status === 409) {
        alert('Email already exists');
      } else if (response.status === 400) {
        alert('Use a valid email and strong password');
      } else {
        alert('Error while registration');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email already exists');
      } else {
        console.error('Error during registration:', error);
        alert('Error while registration');
      }
    }
  }

  useEffect(() => {
    axios.get(`${URL}/user/getRole`)
      .then((response) => {
        // console.log(response);
        setAllRole(response.data.role);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
    axios.get(`${URL}/user/getDesignation`)
      .then((response) => {
        // console.log(response.data.designation);
        setAllDesignation(response.data.designation);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  useEffect(() => {
    getIds()
  }, [selectedRoleValue,selectedDesignationId])

  return (
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
  );
}
