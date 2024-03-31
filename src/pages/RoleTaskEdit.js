import React, { useEffect, useState } from 'react'
import axiosInstance from "./axiosInstance";
import '../styles/RoleTaskEdit.css'
import { useNavigate } from 'react-router-dom'; 

const URL = process.env.BASE_URL;

export default function RoleTaskEdit() {

    const [allTaskId, setAllTaskId] = useState([]);
    const [allRoleId, setAllRoleId] = useState([]);
    const [allRole, setAllRole] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [allTaskStatus, setAllTaskStatus] = useState([]);
    const [taskHeading, setTaskHeading] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [currentRoleId, setCurrentRoleId] = useState('');
    const navigate=useNavigate();
    let config = {
        headers: { 'Content-Type': 'application/json' },
    };

    useEffect(() => {
        addAllTask();
    }, [allRoleId, allTaskId])

    const addAllTask = async () => {
    const promises = [];
    if (!allTaskId || allTaskId.length === 0) {
        console.log('No tasks to add.');
        return;
    }
    for (let i = 0; i < allRoleId?.length; i++) {
        const roleId = allRoleId[i];
        const taskData = allTaskId.map(taskId => ({
            task_id: taskId,
            status: true 
        }));
        const formData = new FormData();
        formData.append('role_id', roleId);
        taskData.forEach(task => {
            formData.append('task_id[][task_id]', task.task_id);
        });
        promises.push(axiosInstance.post(`${URL}/user/assignRoleTask`, formData, config));
    }
    try {
        await Promise.all(promises);
        console.log('All tasks added successfully.');
    } catch (error) {
        console.error('Error adding tasks:', error);
    }
}


    const handleEditButton = ((roledata) => {
        navigate('/editpage', { state: { roleData: roledata } });
    })

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
            // console.log(response);
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


    }, [])

    return (
        <div className='body-RoleTaskEdit'>
            <div>{!allRole.length == 0 ? (
                <>
                    <h2 className='heading'>Role data</h2>
                    <div className='container-table'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRole && allRole.map((roleData, index) => (
                                    <tr key={index}>
                                        <td>{roleData.name}</td>
                                        <td>
                                            <button className='del-button' onClick={() => { handleEditButton(roleData) }}>Edit</button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>

                </>) : (
                <></>
            )}
                
            </div>
        </div>
    )
}
