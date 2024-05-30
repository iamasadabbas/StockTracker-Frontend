import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './ViewUser.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, deleteUser, getAllUser } from '../../actions/userAction';
import Loader from '../../Loader/Loader'
import { useAlert } from 'react-alert';

function ViewUser() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { allUser, loading, error } = useSelector((state) => state.user)
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
    setUpdateSection(true)
  }

  const deleteEntry = async (id) => {
    dispatch(deleteUser(id))
    // dispatch(getAllUser())
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
    // const requestData = {
    //   name: inputName,
    //   email: inputEmail,
    //   phone_no: inputPhone_no
    // };
    // try {
    //   const response = await axiosInstance.post(`${BASE_URL}/user/postuser`, requestData, config);
    //   if (response.status === 200) {
    //     alert('Data added successfully');
    //     setInputName('');
    //   } else {
    //     console.error("Error while saving data");
    //   }
    // } catch (error) {
    //   console.error("Error while saving data:", error);
    //   alert('Failed to add user');
    // }
  }

  const handleUpdate = async () => {
    // const updatedUser = { name: inputName, email: inputEmail, phone_no: inputPhone_no };
    // // alert(updatedUser.username)
    // try {
    //   await axiosInstance.put(`${BASE_URL}/user/editUser/${editingUser._id}`, updatedUser, config);
    //   const response = await axiosInstance.get(`${BASE_URL}/user/getAllUser`, config);
    //   // alert(response.data);
    //   setAllUser(response.data.users);
    //   alert(' udpated successfully');
    //   setInputName('');
    //   setInputEmail('');
    //   setInputPhone_no('')
    //   setEditingUser(null);
    // } catch (error) {
    //   console.error('Error updating User:', error);
    //   // alert('Failed to update User');
    // }
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      return () => dispatch(clearError())
    }
    dispatch(getAllUser())
  }, [error]);


  return (
    <Fragment>
      {
        loading ? (
          <Loader />
        ) : (error ? (null) : (
          <div className='Container-view-user'>
            <div className='container-viewUser'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>S:No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone_No</th>
                    <th colSpan='2' style={{ textAlign: 'center' }}>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {allUser && allUser?.map((element,index) => (
                    <tr key={element.id}>
                      <td>{index+1}</td>
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
        )
      }
    </Fragment>
  )
}

export default ViewUser
