import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearMessage, clearError, getAllRegistrationApproval, updateRole } from '../../actions/registrationApprovalAction';
import { getAllRole } from '../../actions/roleAction';
import Loader from '../Loader/Loader';
import ReactTable from '../ReactTable';
import TablePagination from '@mui/material/TablePagination';
import ViewRequestModal from '../Modal/RequestModel/ViewRequestModal';
import './RegistrationApproval.css';

const RegistrationApproval = ({ show }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, allRegistration, message, error } = useSelector((state) => state.allRegistration);
    const { allRole } = useSelector((state) => state.role);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [searchName, setSearchName] = useState('');
    const [searchDepartment, setSearchDepartment] = useState('');
    const [searchDesignation, setSearchDesignation] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        dispatch(getAllRegistrationApproval());
        if (!allRole.length) {
            dispatch(getAllRole());
        }
    }, [dispatch, allRole.length]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        } else if (message) {
            alert.success(message);
            dispatch(clearMessage());
        }
    }, [message, alert, error, dispatch]);

    const handleRoleChange = (userId, roleId) => {
        setSelectedRoles((prev) => ({ ...prev, [userId]: roleId }));
    };

    const handleSubmit = (userId) => {
        const roleId = selectedRoles[userId._id];
        if (roleId) {
            dispatch(updateRole(userId._id, roleId));
        } else {
            alert.error('Please select a role before submitting.');
        }
    };

    // Simplified filter for debugging
    const filteredRegistrations = allRegistration?.filter(reg => {
        return (
            reg?.name?.toLowerCase().includes(searchName?.toLowerCase()) &&
            reg?.department_id?.name?.toLowerCase().includes(searchDepartment?.toLowerCase()) &&
            reg?.designation_id?.name?.toLowerCase().includes(searchDesignation?.toLowerCase())
        );
    });


    const indexOfLastRequest = page * rowsPerPage + rowsPerPage;
    const indexOfFirstRequest = page * rowsPerPage;
    const currentRequests = filteredRegistrations?.length > 0 ? filteredRegistrations.slice(indexOfFirstRequest, indexOfLastRequest) : [];


    const columns = useMemo(() => [
        {
            Header: 'S:No',
            accessor: (row, index) => indexOfFirstRequest + index + 1,
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        show === 'requestBox' ? {
            Header: 'Status',
            accessor: (row) => row.role_id === null ? 'waiting' : '',
        } : [
            {
                Header: 'Department',
                accessor: 'department_id.name',
            },
            {
                Header: 'Designation',
                accessor: 'designation_id.name',
            },
            {
                Header: 'Faculty',
                accessor: 'faculty_id.name',
            },
            {
                Header: 'Role',
                Cell: ({ row }) => (
                    <select
                        className='select-role'
                        value={selectedRoles[row.original._id] || ''}
                        onChange={(e) => handleRoleChange(row.original._id, e.target.value)}
                    >
                        <option value="">Select role</option>
                        {allRole.map((role) => (
                            <option key={role._id} value={role._id}>{role.name}</option>
                        ))}
                    </select>
                ),
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <button className='btn-Approve-reg' onClick={() => handleSubmit(row.original)}>
                        Approve
                    </button>
                )
            },
        ]
    ].flat(), [show, selectedRoles, allRole, indexOfFirstRequest]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="main-page-container">
            <>
                <div className='pageName_And_Button'>
                    {show !== "requestBox" && <h2>User Approval</h2>}
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Department"
                        value={searchDepartment}
                        onChange={(e) => setSearchDepartment(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Designation"
                        value={searchDesignation}
                        onChange={(e) => setSearchDesignation(e.target.value)}
                    />
                </div>

                {
                loading ? (
                    <Loader />
                ) : (
                filteredRegistrations?.length > 0 ? (
                    <>
                        <div className='table-container'>
                            
                                <ReactTable data={currentRequests} columns={columns} />
                            
                        </div>
                        <TablePagination
                            component="div"
                            count={filteredRegistrations.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                ) : (
                    <div className='no-data-found'>No Data Found.</div>
                ))}
            </>
            {isModalOpen && selectedRequest && (
                <ViewRequestModal
                    request={selectedRequest}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default RegistrationApproval;
