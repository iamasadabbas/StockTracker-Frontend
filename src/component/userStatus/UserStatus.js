import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, getAllUser, updateUserStatus } from '../actions/userAction';
import Loader from '../Loader/Loader';
import Switch from 'react-switch';
import './UserStatus.css';

const UserStatus = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, allUser, error } = useSelector((state) => state.user);

    const toggleStatus = (userId, currentStatus) => {
        const status = !currentStatus;
        dispatch(updateUserStatus(userId, status));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllUser());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                allUser && (
                    <div className="userStatus-table-container">
                        <table className="userStatus-table">
                            <thead className="userStatus-thead">
                                <tr className="userStatus-tr">
                                    <th className="userStatus-th">S:No</th>
                                    <th className="userStatus-th">Name</th>
                                    <th className="userStatus-th">Designation</th>
                                    <th className="userStatus-th">Role</th>
                                    <th className="userStatus-th">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUser.map((record, index) => (
                                    <tr className="userStatus-tr" key={record._id}>
                                        <td className="userStatus-td">{index + 1}</td>
                                        <td className="userStatus-td">{record?.name}</td>
                                        <td className="userStatus-td">{record?.designation_id?.name}</td>
                                        <td className="userStatus-td">{record?.role_id?.name}</td>
                                        <td className="userStatus-status-toggle">
                                            <Switch
                                                onChange={() => toggleStatus(record?._id, record?.status)}
                                                checked={record?.status}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </Fragment>
    );
};

export default UserStatus;
