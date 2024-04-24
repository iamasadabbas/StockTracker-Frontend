import React, { useEffect, useState } from 'react';
import RequestsComponent from '../components/RequestsComponent';
import '../styles/Requests.css';
import axiosInstance from './axiosInstance';
const URL=process.env.BASE_URL || 'http://localhost:4000'
let config = {
    headers: { 'Content-Type': 'application/json' },
  }

function ViewRequest() {
    const [allRequest,setAllRequest]=useState([]);
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async() =>{
        await axiosInstance.get(`${URL}/request/getAllProductRequest`,config).then((response) => {
            const requests=response.data.request;
            setAllRequest(requests)

        }).catch((error) => {
            console.error('Error fetching users:', error);
          });
    }
    const handleRefreshFromModal=()=>{
        fetchData();
    }

    return (
        <>
        <div className='viewreq-main-container'>
        <div className='view-request-conatiner'>
            <table className='table'>
                <thead className='table-head'>
                    <tr>
                        <th>Req.Id</th>
                        <th>User</th>
                        <th>Date.Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allRequest.map((request, index) => (
                        
                        <RequestsComponent
                            key={index}
                            // {...console.log(request)}
                            reqId={request.request_number}
                            userName={request.user_id.name}
                            dateTime={request.createdAt}
                            status={request.status}
                            _id={request.request_id._id}
                            requestId={request._id}
                            request={request}
                            onModalComplete={handleRefreshFromModal}
                        />
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
}

export default ViewRequest;
