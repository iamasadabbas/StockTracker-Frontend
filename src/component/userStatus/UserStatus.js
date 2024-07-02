import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, getAllUser, updateUserStatus } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import Switch from 'react-switch';
import TablePagination from '@mui/material/TablePagination';
import './UserStatus.css';

const UserStatus = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, allUser, error } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.userData);

    const [searchName, setSearchName] = useState('');
    const [searchDesignation, setSearchDesignation] = useState('');
    const [searchRole, setSearchRole] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        } else {
            dispatch(getAllUser());
        }
    }, [dispatch, alert, error]);

    const toggleStatus = (userId, currentStatus) => {
        const status = !currentStatus;
        dispatch(updateUserStatus(userId, status));
    };

    const filteredUsers = allUser?.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.designation_id?.name.toLowerCase().includes(searchDesignation.toLowerCase()) &&
        user.role_id?.name.toLowerCase().includes(searchRole.toLowerCase())
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
                <div className='main-page-container'>
                    <div className='pageName_And_Button'>
                        <h2 >User Status</h2>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Search Designation"
                            value={searchDesignation}
                            onChange={(e) => setSearchDesignation(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Search Role"
                            value={searchRole}
                            onChange={(e) => setSearchRole(e.target.value)}
                        />
                    </div>
                    <div className='table-container'>
                        <table className="customer-table">
                            <thead>
                                <tr>
                                    <th>SrNo</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className='tablebody_data'>
                                {currentUsers?.map((record, index) => (
                                    <tr key={record._id}>
                                        <td>{indexOfFirstUser + index + 1}</td>
                                        <td>{record?.name}</td>
                                        <td>{record?.designation_id?.name}</td>
                                        <td>{record?.role_id?.name}</td>
                                        <td>
                                            {record._id !== user._id && (
                                                <Switch
                                                    onChange={() => toggleStatus(record?._id, record?.status)}
                                                    checked={record?.status}
                                                    onColor="#0033A0"
                                                />
                                            )}
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
                </div>
            )}
        </Fragment>
    );
};

export default UserStatus;
