import React from 'react';
import RequestsComponent from '../components/RequestsComponent';
import '../styles/Requests.css';

function ViewRequest() {
    // You can add your request data here, for demonstration, I'm using hardcoded data
    const requests = [
        { reqId: "1", userName: "Asad", dateTime: '31/03', status: 'waiting', _id: '64ab394r' },
        { reqId: "2", userName: "John", dateTime: '30/03', status: 'approved', _id: '64ab394s' },
        { reqId: "2", userName: "John", dateTime: '30/03', status: 'approved', _id: '64ab394s' },
        { reqId: "2", userName: "John", dateTime: '30/03', status: 'approved', _id: '64ab394s' },
        { reqId: "2", userName: "John", dateTime: '30/03', status: 'approved', _id: '64ab394s' },
        // Add more requests as needed
    ];

    const handleView = (id) => {
        // Implement view functionality here if needed in the parent component
    };

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
                    {requests.map((request, index) => (
                        <RequestsComponent
                            key={index}
                            reqId={request.reqId}
                            userName={request.userName}
                            dateTime={request.dateTime}
                            status={request.status}
                            _id={request._id}
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
