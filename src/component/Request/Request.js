import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRequest } from '../actions/requestAction';
import Loader from '../Loader/Loader';
import RequestTable from './RequestTable.js';
import { useAlert } from 'react-alert';
import './Request.css'
import { clearError } from '../actions/requestAction.js';

const Request = () => {
    const dispatch = useDispatch();
    const alert=useAlert()
    

    const { requests, loading,error } = useSelector((state) => state.requests);

    useEffect(() => {
        if(error){
            alert.error(error);
           return () =>{dispatch(clearError())}
        }
        dispatch(getAllRequest());
    }, [error]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : ( error ? (
                <div></div>
            ):(

            
                <Fragment className='tbody-request-table'>
                    <div className='view-request-conatiner'>
                    <table className='table'>
                        <thead className='table-head'>
                            <tr>
                                <th>S.No</th>
                                <th>User</th>
                                <th>Date.Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {requests?.map((request, index) => (
                           
                            <RequestTable
                                key={index}
                                request={request}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                </Fragment>
                )
            )}
        </Fragment>
    );
};

export default Request;