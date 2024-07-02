import React, { useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import TablePagination from '@mui/material/TablePagination';

const CustomerPage = () => {
  const initialCustomers = [
    { id: 1, name: 'ahmad', email: 'Null', phone: '948,594', branch: 'b_002', address: 'ajdfe dfjie', status: 'Student' },
    { id: 2, name: 'ajdfiahm', email: 'Null', phone: '498,493', branch: 'b_001', address: 'akdjfie', status: 'Student' },
    { id: 3, name: 'fahad', email: 'saf@gmail.com', phone: '84,938,493,938', branch: 'b_001', address: 'sahf dfjidf dfjie', status: 'Student' },
    { id: 4, name: 'zain', email: 'djfei@gmail.com', phone: '49,384,938,493', branch: 'b_001', address: 'adkj fjdif ejdfe', status: 'Student' },
    { id: 5, name: 'ahmad', email: 'Null', phone: '8,493', branch: 'b_002', address: 'adjf', status: 'Student' },
    { id: 6, name: 'ahdf', email: 'Null', phone: '84,934', branch: 'b_002', address: 'sdfj dfjei dfjie', status: 'Student' },
    // Add more customers if needed...
    { id: 7, name: 'ahmad', email: 'Null', phone: '948,594', branch: 'b_002', address: 'ajdfe dfjie', status: 'Student' },
    { id: 8, name: 'ajdfiahm', email: 'Null', phone: '498,493', branch: 'b_001', address: 'akdjfie', status: 'Student' },
    { id: 9, name: 'fahad', email: 'saf@gmail.com', phone: '84,938,493,938', branch: 'b_001', address: 'sahf dfjidf dfjie', status: 'Student' },
    { id: 10, name: 'zain', email: 'djfei@gmail.com', phone: '49,384,938,493', branch: 'b_001', address: 'adkj fjdif ejdfe', status: 'Student' },
    { id: 11, name: 'ahmad', email: 'Null', phone: '8,493', branch: 'b_002', address: 'adjf', status: 'Student' },
    { id: 12, name: 'ahdf', email: 'Null', phone: '84,934', branch: 'b_002', address: 'sdfj dfjei dfjie', status: 'Student' },
    // Add more customers if needed...
    { id: 13, name: 'ahmad', email: 'Null', phone: '948,594', branch: 'b_002', address: 'ajdfe dfjie', status: 'Student' },
    { id: 14, name: 'ajdfiahm', email: 'Null', phone: '498,493', branch: 'b_001', address: 'akdjfie', status: 'Student' },
    { id: 15, name: 'fahad', email: 'saf@gmail.com', phone: '84,938,493,938', branch: 'b_001', address: 'sahf dfjidf dfjie', status: 'Student' },
    { id: 16, name: 'zain', email: 'djfei@gmail.com', phone: '49,384,938,493', branch: 'b_001', address: 'adkj fjdif ejdfe', status: 'Student' },
    { id: 17, name: 'ahmad', email: 'Null', phone: '8,493', branch: 'b_002', address: 'adjf', status: 'Student' },
    { id: 18, name: 'ahdf', email: 'Null', phone: '84,934', branch: 'b_002', address: 'sdfj dfjei dfjie', status: 'Student' },
    // Add more customers if needed...
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchName.toLowerCase()) &&
    customer.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
    customer.address.toLowerCase().includes(searchAddress.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastCustomer = page * rowsPerPage + rowsPerPage;
  const indexOfFirstCustomer = page * rowsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return (
    <div className="main-page-container">
      <div className='pageName_And_Button'>
        <h3>Customer</h3>
        <button className="button-yellow">Add Customer</button>
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter Customer Name" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter Email" 
          value={searchEmail} 
          onChange={(e) => setSearchEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter Address" 
          value={searchAddress} 
          onChange={(e) => setSearchAddress(e.target.value)} 
        />
      </div>
      <div className='table-container'>
        <table className="customer-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Branch</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='tablebody_data'>
            {currentCustomers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{indexOfFirstCustomer + index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.branch}</td>
                <td>{customer.address}</td>
                <td>{customer.status}</td>
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
        count={filteredCustomers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomerPage;
