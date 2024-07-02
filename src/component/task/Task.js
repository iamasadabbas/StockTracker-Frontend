import React, { useEffect, useState } from 'react';
import { clearError, getAllRole, getAllTask, assignTasksToRoles } from '../../actions/roleAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

export default function Task() {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, allTask, error } = useSelector((state) => state.role);

    const [searchTask, setSearchTask] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (error) {
            alert.error(error);
            return () => dispatch(clearError());
        }
        dispatch(getAllTask());
    }, [dispatch, error, alert]);

    useEffect(() => {
        if ( allTask && allTask.length > 0) {
            const allTaskId = allTask.map(task => task._id);
            dispatch(assignTasksToRoles( allTaskId));
        }
    }, [ allTask, dispatch]);

    const filteredTask = allTask?.filter(task => task.name.toLowerCase().includes(searchTask.toLowerCase())) || [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleAddTaskclick = () => {
      navigate('/addTask');
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastRole = page * rowsPerPage + rowsPerPage;
    const indexOfFirstRole = page * rowsPerPage;
    const currentTasks = filteredTask.slice(indexOfFirstRole, indexOfLastRole);

    return (
        <div className='main-page-container'>
            {loading ? (
                <Loader />
            ) : (
                error ? null : (
                    <div>
                        <div className='pageName_And_Button'>
                            <h3>Task</h3>
                            <button className="button-yellow" onClick={handleAddTaskclick}>Add Task</button>
                        </div>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter Role Name"
                                value={searchTask}
                                onChange={(e) => setSearchTask(e.target.value)}
                            />
                        </div>
                        <div className='table-container'>
                            <table className="customer-table">
                                <thead>
                                    <tr>
                                        <th>SrNo</th>
                                        <th>Task Name</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody className='tablebody_data'>
                                    {currentTasks.map((taskData, index) => (
                                        <tr key={taskData._id}>
                                            <td>{index + 1}</td>
                                            <td>{taskData.name}</td>
                                            <td>
                                                {taskData.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <TablePagination
                            component="div"
                            count={filteredTask.length}
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
