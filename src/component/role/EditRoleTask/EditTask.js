import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { getRoleTasks, updateRoleTask, clearError } from '../../actions/roleAction';
import './RoleTaskEdit.css';
import Loader from '../../Loader/Loader';

const EditTask = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useAlert();
    
    const roleData = location.state ? location.state.roleData : null;
    // console.log(roleData);
    
    const { allTask,loading,message, roleTasks, error } = useSelector((state) => state.allRole);
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (roleData) {
            dispatch(getRoleTasks(roleData._id));
        }
    }, [dispatch, roleData, error, alert]);

    useEffect(()=>{
        if(message){
            alert.success(message);
        }
    },[message])

    const handleChangeCheckbox = (taskId,e) => {
        const roleId = roleData._id;
        dispatch(getRoleTasks(roleId))
        const newStatus = e.target.checked;
        dispatch(updateRoleTask(roleId, taskId, newStatus));
    };


    return (
        <Fragment>
            {
                loading ?(
                    <Loader/>
                ):(
                    <div className='body-RoleTaskEdit'>
            {roleData ? (
                <div>
                    <h2 className='heading'>{roleData.name}</h2>
                    <div className='container-checks'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S:No</th>
                                    <th>Task</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roleTasks && roleTasks.map((task, index) => (

                                    <tr key={task.task_id._id}>
                                        <td>{index+1}</td>
                                        <td>{task.task_id.name}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={task.status}
                                                onChange={(e) => handleChangeCheckbox(task.task_id._id,e)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No role data available.</p>
            )}
        </div>
                )
            }
        </Fragment>
    );
};

export default EditTask;
