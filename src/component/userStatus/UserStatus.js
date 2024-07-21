import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, getAllUser, updateUserStatus } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import Switch from 'react-switch';
import ReactTable from '../ReactTable';
// import './UserStatus.css';

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

    const filteredUsers = useMemo(() => {
        return allUser?.filter((user) =>
            user.name.toLowerCase().includes(searchName.toLowerCase()) &&
            user.designation_id?.name.toLowerCase().includes(searchDesignation.toLowerCase()) &&
            user.role_id?.name.toLowerCase().includes(searchRole.toLowerCase())
        );
    }, [searchName, searchDesignation, searchRole, allUser]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = useMemo(() => [
        {
            Header: 'SrNo',
            accessor: (row, index) => page * rowsPerPage + index + 1,
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Designation',
            accessor: 'designation_id.name',
        },
        {
            Header: 'Role',
            accessor: 'role_id.name',
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => {
                const record = row.original;
                if (user.role_id.name === 'admin') {
                    return (
                        record._id !== user._id && record.role_id.name !== 'SuperAdmin' && (
                            <Switch
                                onChange={() => toggleStatus(record._id, record.status)}
                                checked={record.status}
                                onColor="#0033A0"
                            />
                        )
                    );
                } else {
                    return (
                        
                            <Switch
                                onChange={() => toggleStatus(record._id, record.status)}
                                checked={record.status}
                                onColor="#0033A0"
                                disabled={record._id == user._id || record.role_id.name == 'SuperAdmin'}
                            />
                    );
                }
            },
        },
    ], [page, rowsPerPage, toggleStatus, user._id]);

    const data = useMemo(() => filteredUsers || [], [filteredUsers]);

    return (
        <Fragment>
            
                <div className='main-page-container'>
                    <div className='pageName_And_Button'>
                        <h2>User Status</h2>
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
                    {loading ? (
                <Loader />
            ) : (
                        <ReactTable
                            columns={columns}
                            data={data}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    )}
                    </div>
                </div>
            
        </Fragment>
    );
};

export default UserStatus;
