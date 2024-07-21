import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearError } from '../../actions/addTaskAction';
import Loader from '../Loader/Loader';
import { useAlert } from 'react-alert';
import { clearMessage } from '../../actions/roleAction';

const AddTask = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    
    const [taskInput, setTaskInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const { loading, message, error } = useSelector((state) => state.addTask);

    const handleTaskChange = (e) => setTaskInput(e.target.value);
    const handleDescriptionChange = (e) => setDescriptionInput(e.target.value);

    const handleClear = () => {
        setTaskInput('');
        setDescriptionInput('');
    };

    const handleViewTasksClick = () => {
        navigate('/task');
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
           return ()=> dispatch(clearError());
        } else if (message) {
            alert.success(message);
            return ()=>dispatch(clearMessage())
        }
    }, [error, message, dispatch, alert]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addTask(taskInput, descriptionInput));
        handleClear();
        navigate('/task');
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="main-page-container">
                    <div className='pageName_And_Button'>
                        <h2 className="add-visa-type-title">Add Task</h2>
                        <button className="button-yellow" onClick={handleViewTasksClick}>View Task</button>
                    </div>
                    <form className="input-bar" onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <div className='input-with-label'>
                                <label className='required'>Task</label>
                                <input
                                    type="text"
                                    className='yellow_border'
                                    name="Task"
                                    placeholder="Enter task name"
                                    value={taskInput}
                                    onChange={handleTaskChange}
                                    required
                                />
                            </div>
                            <div className='input-with-label'>
                                <label className='required'>Description</label>
                                <input
                                    type="text"
                                    className='yellow_border'
                                    name="Description"
                                    placeholder="Enter task description"
                                    value={descriptionInput}
                                    onChange={handleDescriptionChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="clear-and-Add-button-container">
                            <button type="button" onClick={handleClear} className="clear-And-Add-Record-button">
                                Clear
                            </button>
                            <button type="submit" className="clear-And-Add-Record-button">
                                Add Record
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </Fragment>
    );
};

export default AddTask;
