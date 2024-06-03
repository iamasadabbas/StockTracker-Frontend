import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import RequestTable from './RequestTable.js';
import { useAlert } from 'react-alert';
import './Request.css'
import { getAllRequest,clearError } from '../../actions/requestAction.js';

const Request = () => {
    const dispatch = useDispatch();
    const alert=useAlert()
    

    const { requests, loading,error } = useSelector((state) => state.requests);
    // console.log(requests);

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
                <>
                <Fragment className='tbody-request-table'>
                <h1 className='page-heading'>Requests</h1>
                    
                    <div className='view-request-conatiner'>
                    <table className='table'>
                        <thead className='table-head'>
                            <tr>
                                <th>S.No</th>
                                <th>Req.Id</th>
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
                                SNo={index+1}
                                request={request}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                </Fragment>
                </>
                )
            )}
        </Fragment>
    );
};

export default Request;