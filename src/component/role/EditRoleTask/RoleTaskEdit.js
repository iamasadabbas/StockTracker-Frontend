import React, { useEffect } from 'react';
import './RoleTaskEdit.css';
import { clearError, getAllRole, getAllTask, assignTasksToRoles } from '../../../actions/roleAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

export default function RoleTaskEdit() {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, allRole, allTask, error } = useSelector((state) => state.allRole);

    useEffect(() => {
        if (error) {
            alert.error(error);
           return ()=> dispatch(clearError());
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

    return (
        <div className='body-RoleTaskEdit'>
            {loading ? (
                <Loader />
            ) : (
                error ?(null):(

                
                <div>
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
                                            <button className='del-button' onClick={() => handleEditButton(roleData)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                )
            )}
        </div>
    );
}
