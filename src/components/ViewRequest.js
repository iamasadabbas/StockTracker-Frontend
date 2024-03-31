// UserRequestDetails.js
import React from 'react';
import '../styles/ViewRequest.css'

function ViewRequest( props) {
    return (
        <div className="user-request-details">
            <h2>User Details</h2>
            <p>Name: {props.userName}</p>
            <p>Email: {props.reqId}</p>
            <p>Name: {props.status}</p>
            <p>Price: {props.dateTime}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default ViewRequest;
