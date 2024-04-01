import React from 'react'
import { useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useState } from 'react';
import '../styles/ViewUser.css'
let config = {
  headers: { 'Content-Type': 'application/json' },
}
const BASE_URL = process.env.BASE_URL  || 'http://localhost:4000';



function ViewUser() {
  const [allUser, setAllUser] = useState([])
  const [inputName, setInputName] = useState([]);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone_no, setInputPhone_no] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [updateSection, setUpdateSection] = useState(false);

  const editEntry = async (element) => {
    setInputName(element.name);
    setInputEmail(element.email);
    setInputPhone_no(element.phone_no);
    setEditingUser(element);
    // setHeading('Update User here')
    setUpdateSection(true)
  }

  const deleteEntry = (id) => {
    axiosInstance.delete(`${BASE_URL}/user/removeUser/${id}`).then(() => {
      axiosInstance.get(`${BASE_URL}/user/getAllUser`, config).then((response) => {
        setAllUser(response.data.users);
      });
    }).catch((error) => {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    });
  }

  const handleChangeName = (val) => {
    setInputName(val.target.value);
  }
  const handleChangeEmail = (val) => {
    setInputEmail(val.target.value);
  }
  const handleChangePhone_no = (val) => {
    setInputPhone_no(val.target.value);
  }

  const handleSubmit = async () => {
    const requestData = {
      name: inputName,
      email: inputEmail,
      phone_no: inputPhone_no
    };
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/postuser`, requestData, config);
      if (response.status === 200) {
        alert('Data added successfully');
        setInputName('');
      } else {
        console.error("Error while saving data");
      }
    } catch (error) {
      console.error("Error while saving data:", error);
      alert('Failed to add user');
    }
  }

  const handleUpdate = async () => {
    const updatedUser = { name: inputName, email: inputEmail, phone_no: inputPhone_no };
    // alert(updatedUser.username)
    try {
      await axiosInstance.put(`${BASE_URL}/user/editUser/${editingUser._id}`, updatedUser, config);
      const response = await axiosInstance.get(`${BASE_URL}/user/getAllUser`, config);
      // alert(response.data);
      setAllUser(response.data.users);
      alert(' udpated successfully');
      setInputName('');
      setInputEmail('');
      setInputPhone_no('')
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating User:', error);
      // alert('Failed to update User');
    }
  }
  useEffect(() => {
    axiosInstance.get(`${BASE_URL}/user/getAlluser`, config).then((response) => {
      //   console.log(response.data.users);
      setAllUser(response.data.users)
    }).catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, []);


  return (
    <div className='Container-view-user'>
      <div className='container-viewUser'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone_No</th>
              <th colSpan='2' style={{ textAlign: 'center' }}>Operation</th>
            </tr>
          </thead>
          <tbody>
            {allUser && allUser?.map((element) => (
              <tr key={element.id}>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.phone_no}</td>
                <td>
                  <button className='del-button' onClick={() => { deleteEntry(element._id) }}>Delete</button>
                </td>
                <td>
                  <button className='del-button' onClick={() => { editEntry(element) }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {updateSection && <>
      <h1 className='heading'>{'Update User'}</h1>
      <div className='container-Edit'>
        <form onSubmit={handleUpdate} className='large-form'>
          <label className='label'>name</label>
          <input className='input' required type='text' value={inputName} onChange={handleChangeName} placeholder='Enter username here' />
          <br />
          <label className='label'>Email</label>
          <input className='input' required type='email' value={inputEmail} onChange={handleChangeEmail} placeholder='Enter email here' />
          <br />
          <label className='label'>Phone_no</label>
          <input className='input' required type='text' value={inputPhone_no} onChange={handleChangePhone_no} placeholder='Enter password here' />
          <br />
          <button className='button-submit' type='submit'>{editingUser ? 'Update' : 'Submit'}</button>
        </form>
      </div>
      </>
      }
    </div>
  )
}

export default ViewUser
