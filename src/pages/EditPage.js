import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import '../styles/RoleTaskEdit.css';
import { useLocation } from 'react-router-dom';

const URL = process.env.BASE_URL;

const EditPage = () => {
    const [allTaskId, setAllTaskId] = useState([]);
    const [allRoleId, setAllRoleId] = useState([]);
    const [allRole, setAllRole] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [allTaskStatus, setAllTaskStatus] = useState([]);
    const [taskHeading, setTaskHeading] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [currentRoleId, setCurrentRoleId] = useState('');

    const location = useLocation();
    const roleData = location.state ? location.state.roleData : null;

    let config = {
        headers: { 'Content-Type': 'application/json' },
    };

    useEffect(() => {
        handleEditButton();
    }, [roleData]); 

    const handleEditButton = () => {
        if (!roleData) return;
        setCurrentRole(roleData.name);
        setCurrentRoleId(roleData._id);
        axiosInstance.get(`${URL}/user/getRoleTask/${roleData._id}`, config)
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    const taskArray = response.data[0].task_id;
                    const tasks = [];
                    const statuses = [];
                    taskArray.forEach((element) => {
                        tasks.push(element.task_id);
                        statuses.push(element.status);
                    });
                    setAllTaskId(tasks);
                    setAllTaskStatus(statuses);
                    setTaskHeading('Task Status')
                } else {
                    alert('error');
                }
            })
            .catch((error) => {
                console.error('Error fetching roles:', error);
                alert('Error fetching roles. Please try again later.');
            });
    }

    const handleChangeCheckbox = (index, e) => {
        const updatedStatuses = [...allTaskStatus];
        updatedStatuses[index] = e.target.checked;
        setAllTaskStatus(updatedStatuses);
        console.log(allTask);
        const taskId = allTask[index]._id;
        const roleId = currentRoleId;
        const newStatus = e.target.checked;

        axiosInstance.put(`${URL}/user/updateAssignRoleTask/${roleId}/${taskId}`, { status: newStatus }, config)
            .then(response => {
                // console.log(response);
                alert('Task status updated successfully');
            })
            .catch(error => {
                console.error('Error updating task status:', error);
                alert('Error updating task status. Please try again later.');
            });

    };

    useEffect(() => {
        axiosInstance.get(`${URL}/user/getRole`, config)
            .then((response) => {
                if (response.status === 200) {
                    const roles = response.data.role;
                    setAllRole(roles);
                    const allRoleIds = []
                    roles.forEach(element => {
                        allRoleIds.push(element._id);
                    });
                    setAllRoleId(allRoleIds)
                } else {
                    alert('error');
                }
            })
            .catch((error) => {
                console.error('Error fetching roles:', error);
                alert('Error fetching roles. Please try again later.');
            });
        axiosInstance.get(`${URL}/user/getAllTask`, config).then((response) => {
            const allTasks = response.data.task;
            setAllTask(allTasks);
            const taskId = [];
            allTasks.forEach(element => {
                taskId.push(element._id);
            });
            setAllTaskId(taskId)
        }).catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, []); 

    return (
        <div className='body-RoleTaskEdit'>
            <div>
                <label>
                    <div className='container-checks'>
                        <h2 className='heading'>{currentRole}</h2>
                        <table className='table'>
                            <tbody>
                                <>
                                    <tr>
                                        <th>Task</th>
                                        <th>Operation</th>
                                    </tr>
                                    {allTask.map((task, index) => (
                                        <tr key={task._id}>
                                            <td>{task.name}</td>
                                            <td>
                                                <input type="checkbox" checked={allTaskStatus[index]} onChange={(e) => handleChangeCheckbox(index, e)} />
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            </tbody>
                        </table>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default EditPage;
