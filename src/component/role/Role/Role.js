import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearMessage, getAllRole } from '../../../actions/roleAction';
import { useNavigate } from 'react-router-dom';
import ReactTable from '../../ReactTable'; // Make sure to import the ReactTable component
import Loader from '../../Loader/Loader';

const Role = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        if (error) {
            alert.error(error);
            return () => dispatch(clearError());
        }
        if (message) {
            alert.message(message);
            return () => dispatch(clearMessage());
        }
        dispatch(getAllRole());
    }, [dispatch, error, message]);

    const indexOfLastCustomer = page * rowsPerPage + rowsPerPage;
    const indexOfFirstCustomer = page * rowsPerPage;
    const currentRoles = filteredRoles?.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const handleAddRoleClick = () => {
        navigate('/addrole');
    };

    const columns = [
        {
            Header: 'SrNo',
            accessor: (row, index) => index + 1
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Description',
            accessor: 'description'
        },
        // {
        //     Header: 'Action',
        //     accessor: 'action',
        //     Cell: ({ row }) => (
        //         <>
        //             <button className="action-btn"><AiFillDelete /></button>
        //             <button className="action-btn"><MdOutlineUpdate /></button>
        //         </>
        //     )
        // }
    ];

    return (
        <>

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
                    {loading ? (
                        <Loader />
                    ) : (
                        <ReactTable data={currentRoles} columns={columns} />
                    )}
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

        </>
    );
};

export default Role;
