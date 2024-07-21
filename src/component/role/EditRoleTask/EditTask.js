import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { getRoleTasks, updateRoleTask, clearError } from '../../../actions/roleAction';
import Loader from '../../Loader/Loader';
import TablePagination from '@mui/material/TablePagination';
import ReactTable from '../../ReactTable'; // Ensure the path is correct

const EditTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useAlert();

    const roleData = location.state ? location.state.roleData : null;

    const { allTask, loading, message, roleTasks, error } = useSelector((state) => state.role);

    const [searchTask, setSearchTask] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (roleData) {
            dispatch(getRoleTasks(roleData._id));
        }
    }, [dispatch, roleData, error, alert]);

    useEffect(() => {
        if (message) {
            alert.success(message);
        }
    }, [message]);

    const handleChangeCheckbox = (taskId, e) => {
        const roleId = roleData._id;
        dispatch(getRoleTasks(roleId));
        const newStatus = e.target.checked;
        dispatch(updateRoleTask(roleId, taskId, newStatus));
    };

    const filteredTasks = roleTasks?.filter(task => task.task_id.name.toLowerCase().includes(searchTask.toLowerCase())) || [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastTask = page * rowsPerPage + rowsPerPage;
    const indexOfFirstTask = page * rowsPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const columns = [
        {
            Header: 'S:No',
            accessor: (row, index) => indexOfFirstTask + index + 1
        },
        {
            Header: 'Task',
            accessor: 'task_id.name'
        },
        {
            Header: 'Operation',
            accessor: 'status',
            Cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.status}
                    onChange={(e) => handleChangeCheckbox(row.original.task_id._id, e)}
                />
            )
        }
    ];

    return (
        <Fragment>

            <div className='main-page-container'>
                {roleData ? (
                    <div>
                        <div className='pageName_And_Button'>
                            <h3>{`${roleData.name} tasks`}</h3>
                            <button className="button-yellow" onClick={() => navigate('/roleTaskEdit')}>Back</button>
                        </div>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter Task Name"
                                value={searchTask}
                                onChange={(e) => setSearchTask(e.target.value)}
                            />
                        </div>
                        <div className='table-container'>
                            {loading ? (
                                <Loader />
                            ) : (
                                <ReactTable data={currentTasks} columns={columns} />
                            )}
                        </div>
                        <TablePagination
                            component="div"
                            count={filteredTasks.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                ) : (
                    <p>No role data available.</p>
                )}
            </div>

        </Fragment>
    );
};

export default EditTask;
