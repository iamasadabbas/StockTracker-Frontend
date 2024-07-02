import React, { useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import TablePagination from '@mui/material/TablePagination';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearError, clearMessage, getAllRole } from '../../../actions/roleAction';
import { useNavigate } from 'react-router-dom';

const Role = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch()
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { loading, message, error, allRole } = useSelector(state => state.role);

  const filteredRoles = allRole?.filter(role =>
    role.name.toLowerCase().includes(searchName.toLowerCase()) &&
    role.description.toLowerCase().includes(searchDescription.toLowerCase()) 
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if(error){
      alert.error(error)
      return ()=>dispatch(clearError())
    }
    if(error){
      alert.message(message)
      return ()=>dispatch(clearMessage())
    }
    dispatch(getAllRole());
  }, [dispatch,error,message]);
  const indexOfLastCustomer = page * rowsPerPage + rowsPerPage;
  const indexOfFirstCustomer = page * rowsPerPage;
  const currentRoles = filteredRoles?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const handleAddRoleClick =()=>{
    navigate('/addrole')
  }

  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h2>Role</h2>
        <button className="button-yellow" onClick={handleAddRoleClick}>Add Role</button>
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter Role Name" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter Description"  
          value={searchDescription} 
          onChange={(e) => setSearchDescription(e.target.value)} 
        />
      </div>
      <div className='table-container'>
        <table className="customer-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='tablebody_data'>
            {currentRoles?.map((role, index) => (
              <tr key={role.id}>
                <td>{index + 1}</td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <button className="action-btn"><AiFillDelete/></button>
                  <button className="action-btn"><MdOutlineUpdate/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        component="div"
        count={filteredRoles?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Role;
