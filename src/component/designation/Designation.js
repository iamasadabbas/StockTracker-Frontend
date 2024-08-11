import React, { useEffect, useState, useMemo } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDesignation } from '../../actions/designationAction';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import ReactTable from '../ReactTable';

const Designation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, allDesignation } = useSelector((state) => state.designation);

  useEffect(() => {
    dispatch(getAllDesignation());
  }, [dispatch]);

  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredDesignations = allDesignation?.filter(designation =>
    designation?.name?.toLowerCase().includes(searchName.toLowerCase())
  ) || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddDesignationClick = () => {
    navigate('/addDesignation');
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = useMemo(() => [
    {
      Header: 'SrNo',
      accessor: (row, i) => i + 1,
    },
    {
      Header: 'Designation Name',
      accessor: 'name',
    },
    // {
    //   Header: 'Actions',
    //   Cell: ({ row }) => (
    //     <>
    //       <button className="action-btn"><AiFillDelete /></button>
    //       <button className="action-btn"><MdOutlineUpdate /></button>
    //     </>
    //   ),
    // },
  ], []);

  const data = useMemo(() => filteredDesignations, [filteredDesignations]);

  const { roleTask } = useSelector(
    (state) => state.userData
  );
  var task = false;
  task = roleTask.find((e) => e?.task_id?.name === "Add User Designation" && e.status === true);

  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h3>Designation</h3>
        {task ? 
        
        <button className="button-yellow" onClick={handleAddDesignationClick}>Add Designation</button>
        : null}
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
          <>
            <ReactTable columns={columns} data={data} />
          </>
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
