import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../../actions/companyAction';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './AllCompany.css';
import '../test.css'

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
  );

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
  const currentCompanies = filteredCompanies?.slice(indexOfFirstCompany, indexOfLastCompany);

  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h1>All Companies</h1>
        <button className="button-yellow" onClick={handleAddCompany}>Add Company</button>
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
        <table className="company-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody className='tablebody_data'>
            {currentCompanies?.map((company, index) => (
              <tr key={company.id}>
                <td>{index + 1}</td>
                <td>{company.name}</td>
                <td>{company.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        component="div"
        count={filteredCompanies?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default AllCompany;
