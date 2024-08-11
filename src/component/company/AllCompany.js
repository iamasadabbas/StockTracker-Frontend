import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../../actions/companyAction';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import ReactTable from '../ReactTable'; // Adjust the path as needed
import Loader from '../Loader/Loader';

const AllCompany = () => {
  const { loading, allCompany, error } = useSelector((state) => state.company);
  
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  const filteredCompanies = allCompany?.filter(company =>
    company.name.toLowerCase().includes(searchName.toLowerCase()) &&
    company.description.toLowerCase().includes(searchDescription.toLowerCase())
  ) || [];

  const handleAddCompany = () => {
    navigate('/addcompany');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastCompany = page * rowsPerPage + rowsPerPage;
  const indexOfFirstCompany = page * rowsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Define columns for ReactTable
  const columns = React.useMemo(
    () => [
      {
        Header: 'SrNo',
        accessor: 'srNo',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  // Format data for ReactTable
  const tableData = React.useMemo(
    () =>
      currentCompanies.map((company, index) => ({
        srNo: indexOfFirstCompany + index + 1,
        name: company.name,
        description: company.description,
        id: company.id,
      })),
    [currentCompanies, indexOfFirstCompany]
  );

  const { roleTask } = useSelector(
    (state) => state.userData
  );
  var task = false;
  task = roleTask.find((e) => e?.task_id?.name === "Add Product Company" && e.status === true);


  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h1>All Companies</h1>
        {task ? 
        
        <button className="button-yellow" onClick={handleAddCompany}>Add Company</button>
        : null}
      </div>
      <div className="search-bar">
        <input
          type="text"
          className="company-search-input"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          className="company-search-input"
          placeholder="Search by description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
        />
      </div>
      <div className='table-container'>

        {loading ?  (<Loader/>):(
          <ReactTable data={tableData} columns={columns} />
        )}
      </div>
      <TablePagination
        component="div"
        count={filteredCompanies.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AllCompany;
