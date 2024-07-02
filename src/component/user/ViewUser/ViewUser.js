import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, deleteUser, getAllUser } from '../../../actions/userAction';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import TablePagination from '@mui/material/TablePagination';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import './ViewUser.css';

function ViewUser() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { allUser, loading, error } = useSelector((state) => state.user);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone_no, setInputPhone_no] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [updateSection, setUpdateSection] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const editEntry = (element) => {
    setInputName(element.name);
    setInputEmail(element.email);
    setInputPhone_no(element.phone_no);
    setEditingUser(element);
    setUpdateSection(true);
  };

  const deleteEntry = (id) => {
    dispatch(deleteUser(id));
  };

  const handleChangeName = (val) => {
    setInputName(val.target.value);
  };
  const handleChangeEmail = (val) => {
    setInputEmail(val.target.value);
  };
  const handleChangePhone_no = (val) => {
    setInputPhone_no(val.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle update logic
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllUser());
  }, [dispatch, error, alert]);

  const filteredUsers = allUser?.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) &&
    user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
    user.phone_no.toLowerCase().includes(searchPhone.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastUser = page * rowsPerPage + rowsPerPage;
  const indexOfFirstUser = page * rowsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-page-container">
          <div className="pageName_And_Button">
            <h2 className="page-heading">Users</h2>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Phone No"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </div>
          <div className='table-container'>
            <table className='customer-table'>
              <thead>
                <tr>
                  <th>S:No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='tablebody_data'>
                {currentUsers?.map((element, index) => (
                  <tr key={element._id}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.phone_no}</td>
                    <td>
                      <button className="action-btn" onClick={() => deleteEntry(element._id)}><AiFillDelete /></button>
                      <button className="action-btn" onClick={() => editEntry(element)}><MdOutlineUpdate /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            component="div"
            count={filteredUsers?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {updateSection && (
            <>
              <h1 className='heading'>{'Update User'}</h1>
              <div className='container-Edit'>
                <form onSubmit={handleUpdate} className='large-form'>
                  <label className='label'>Name</label>
                  <input className='input' required type='text' value={inputName} onChange={handleChangeName} placeholder='Enter username here' />
                  <br />
                  <label className='label'>Email</label>
                  <input className='input' required type='email' value={inputEmail} onChange={handleChangeEmail} placeholder='Enter email here' />
                  <br />
                  <label className='label'>Phone No</label>
                  <input className='input' required type='text' value={inputPhone_no} onChange={handleChangePhone_no} placeholder='Enter phone number here' />
                  <br />
                  <button className='button-submit' type='submit'>{editingUser ? 'Update' : 'Submit'}</button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default ViewUser;
