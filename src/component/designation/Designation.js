import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDesignation } from '../../actions/designationAction';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Designation = () => {
    const navigate=useNavigate()
  const dispatch = useDispatch();
  const { loading, error, allDesignation } = useSelector((state) => state.designation);
  console.log(allDesignation);

  useEffect(() => {
    dispatch(getAllDesignation());
  }, [dispatch]);

  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredDesignations = allDesignation?.filter(designation =>
    designation?.name?.toLowerCase().includes(searchName.toLowerCase()) 
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleAddDesignationClick =()=>{
    navigate('/addDesignation');
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastDesignation = page * rowsPerPage + rowsPerPage;
  const indexOfFirstDesignation = page * rowsPerPage;
  const currentDesignations = filteredDesignations?.slice(indexOfFirstDesignation, indexOfLastDesignation);

  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h3>Designation</h3>
        <button className="button-yellow" onClick={handleAddDesignationClick}>Add Designation</button>
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter Designation Name" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
        />
      </div>
      <div className='table-container'>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="customer-table">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Designation Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='tablebody_data'>
              {currentDesignations.map((designation, index) => (
                <tr key={designation.id}>
                  <td>{indexOfFirstDesignation + index + 1}</td>
                  <td>{designation.name}</td>
                  <td>
                    <button className="action-btn"><AiFillDelete/></button>
                    <button className="action-btn"><MdOutlineUpdate/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <TablePagination
        component="div"
        count={filteredDesignations?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Designation;
