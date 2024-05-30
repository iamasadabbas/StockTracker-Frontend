import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllRegistrationApproval, updateRole } from '../actions/registrationApprovalAction';
import { getAllRole } from '../actions/roleAction';
import Loader from '../Loader/Loader';
import './RegistrationApproval.css';

const RegistrationApproval = ({show}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, allRegistration, message, error } = useSelector((state) => state.allRegistration);
    const { allRole } = useSelector((state) => state.allRole);
    const [selectedRoles, setSelectedRoles] = useState({});

    useEffect(() => {
        dispatch(getAllRegistrationApproval());
        if (!allRole.length) {
            dispatch(getAllRole());
        }
    }, [dispatch, allRole.length]);

    useEffect(() => {
        if(error){
            alert.error(error);
        }else if (message) {
            alert.success(message);
        }
    }, [message, alert,error]);

    const handleRoleChange = (userId, roleId) => {
        setSelectedRoles((prev) => ({ ...prev, [userId]: roleId }));
    };

    const handleSubmit = (userId) => {
        const roleId = selectedRoles[userId];
        if (roleId) {
            dispatch(updateRole(userId, roleId));
        } else {
            alert.error('Please select a role before submitting.');
        }
    };

    return (
        <div className="registration-approval">
            {loading ? (
                <Loader />
            ) : error ? ( null
                // <p className="error">Error: {error}</p>
            ) : (
                allRegistration && allRegistration.length > 0 ? (
                    <table className="registration-table">
                        <thead>
                            <tr>
                                <th>S:No</th>
                                <th>Name</th>
                                {show==='requestBox' ? (
                                    <th>Status</th>
                                ):(
                                    <>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th>Action</th>
                                </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {allRegistration.map((user,index) => (
                                <tr key={user._id}>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    {show==='requestBox' ? (
                                    <th>{user.role_id===null ? ('waiting'):("")}</th>
                                ):(
                                    <>
                                    <td>{user.email}</td>
                                    <td>{user.phone_no}</td>
                                    <td>
                                        <select
                                            value={selectedRoles[user._id] || ''}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        >
                                            <option value="">Select role</option>
                                            {allRole.map((role) => (
                                                <option key={role._id} value={role._id}>{role.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSubmit(user._id)}>Submit</button>
                                    </td>
                                    </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='heading-NoRequest'>
                        <h1 >No requests</h1>
                    </div>
                )
            )}
        </div>
    );
};

export default RegistrationApproval;
