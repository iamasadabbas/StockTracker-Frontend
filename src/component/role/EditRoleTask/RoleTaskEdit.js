import React, { useEffect, useState } from 'react';
// import './test.css'; // Updated to use the provided CSS
import { clearError, getAllRole, getAllTask, assignTasksToRoles } from '../../../actions/roleAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";


export default function RoleTaskEdit() {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, allRole, allTask, error } = useSelector((state) => state.role);

    const [searchRole, setSearchRole] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (error) {
            alert.error(error);
            return () => dispatch(clearError());
        }
        dispatch(getAllRole());
        dispatch(getAllTask());
    }, [dispatch, error, alert]);

    useEffect(() => {
        if (allRole && allTask && allRole.length > 0 && allTask.length > 0) {
            const allRoleId = allRole.map(role => role._id);
            const allTaskId = allTask.map(task => task._id);
            dispatch(assignTasksToRoles(allRoleId, allTaskId));
        }
    }, [allRole, allTask, dispatch]);

    const handleEditButton = (roleData) => {
        navigate('/editTask', { state: { roleData } });
    };

    const filteredRoles = allRole?.filter(role => role.name.toLowerCase().includes(searchRole.toLowerCase())) || [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastRole = page * rowsPerPage + rowsPerPage;
    const indexOfFirstRole = page * rowsPerPage;
    const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

    return (
        <div className='main-page-container'>
            {loading ? (
                <Loader />
            ) : (
                error ? null : (
                    <div>
                        <div className='pageName_And_Button'>
                            <h3>Edit Role Task</h3>
                            {/* <button className="button-yellow">Add Role</button> */}
                        </div>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter Role Name"
                                value={searchRole}
                                onChange={(e) => setSearchRole(e.target.value)}
                            />
                        </div>
                        <div className='table-container'>
                            <table className="customer-table">
                                <thead>
                                    <tr>
                                        <th>SrNo</th>
                                        <th>Role Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='tablebody_data'>
                                    {currentRoles.map((roleData, index) => (
                                        <tr key={roleData._id}>
                                            <td>{indexOfFirstRole + index + 1}</td>
                                            <td>{roleData.name}</td>
                                            <td>
                                                <button className="action-btn" onClick={() => handleEditButton(roleData)}><FaUserEdit /></button>
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <TablePagination
                            component="div"
                            count={filteredRoles.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                )
            )}
        </div>
    );
}
