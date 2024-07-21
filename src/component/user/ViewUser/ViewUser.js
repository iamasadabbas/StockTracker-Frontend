import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, deleteUser, getAllUser, updateUserData } from '../../../actions/userAction'; // Import updateUser action
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import TablePagination from '@mui/material/TablePagination';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import './ViewUser.css';
import ReactTable from '../../ReactTable';
import Tippy from '@tippyjs/react';
import UpdateUserModal from '../../Modal/UpdateUserModal/UpdateUserModal'; // Import the UpdateUserModal component

function ViewUser() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { allUser, loading, error } = useSelector((state) => state.user);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone_no, setInputPhone_no] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const editEntry = (element) => {
    setInputName(element.name);
    setInputEmail(element.email);
    setInputPhone_no(element.phone_no);
    setEditingUser(element._id);
    setIsUpdateModalOpen(true);
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

  const handleUpdate = (updatedUserData) => {
    // Dispatch action to update user
    dispatch(updateUserData(editingUser, updatedUserData))
      .then(() => {
        setIsUpdateModalOpen(false); // Close modal on successful update
        // alert.success('User updated successfully');
      })
      .catch((error) => {
        alert.error('Failed to update user');
      });
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

  // Define columns for ReactTable
  const columns = React.useMemo(
    () => [
      {
        Header: 'S:No',
        accessor: 'srNo',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone No',
        accessor: 'phone_no',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            {/* <button className="action-btn" onClick={() => deleteEntry(row.original._id)}><AiFillDelete /></button> */}
            <Tippy content='Edit User Details'>
              <button className="action-btn" onClick={() => editEntry(row.original)}><MdOutlineUpdate /></button>
            </Tippy>
          </div>
        ),
      },
    ],
    []
  );

  // Format data for ReactTable
  const tableData = React.useMemo(
    () =>
      currentUsers?.map((user, index) => ({
        srNo: indexOfFirstUser + index + 1,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        _id: user._id,
      })),
    [currentUsers, indexOfFirstUser]
  );

  return (
    <Fragment>

      <div className="main-page-container">
        <div className="pageName_And_Button">
          <h2>Users</h2>
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
          {loading ? (
            <Loader />
          ) : (
            <ReactTable data={tableData} columns={columns} />
          )}
        </div>
        <TablePagination
          component="div"
          count={filteredUsers?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {
          isUpdateModalOpen && <UpdateUserModal
            isUpdateModalOpen={isUpdateModalOpen}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            inputName={inputName}
            inputEmail={inputEmail}
            inputPhone_no={inputPhone_no}
            handleChangeName={handleChangeName}
            handleChangeEmail={handleChangeEmail}
            handleChangePhone_no={handleChangePhone_no}
            handleUpdate={handleUpdate}
          />
        }

      </div>

    </Fragment>
  );
}

export default ViewUser;
