import React, { useEffect, useState, useMemo } from 'react';
import { clearError, getAllTask, assignTasksToRoles } from '../../actions/roleAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import ReactTable from '../ReactTable'; // Ensure the path is correct

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
        if (allTask && allTask.length > 0) {
            const allTaskId = allTask.map(task => task._id);
            dispatch(assignTasksToRoles(allTaskId));
        }
    }, [allTask, dispatch]);

    const filteredTask = allTask?.filter(task => task.name.toLowerCase().includes(searchTask.toLowerCase())) || [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAddTaskClick = () => {
        navigate('/addTask');
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastRole = page * rowsPerPage + rowsPerPage;
    const indexOfFirstRole = page * rowsPerPage;
    const currentTasks = filteredTask.slice(indexOfFirstRole, indexOfLastRole);

    const columns = useMemo(() => [
        {
            Header: 'SrNo',
            accessor: (row, index) => indexOfFirstRole + index + 1,
        },
        {
            Header: 'Task Name',
            accessor: 'name',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
    ], [indexOfFirstRole]);

    const { roleTask } = useSelector(
        (state) => state.userData
      );
      var task = false;
      task = roleTask.find((e) => e?.task_id?.name === "Add Role Task" && e.status === true);


    return (
        <>
            <div className='main-page-container'>
                <div className='pageName_And_Button'>
                    <h3>Task</h3>
                    {task ?<button className="button-yellow" onClick={handleAddTaskClick}>Add Task</button> : null}
                    
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Task Name"
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
                    count={filteredTask.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            )

        </>
    );
}
