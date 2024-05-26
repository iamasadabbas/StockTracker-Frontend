import React, { Fragment, useState } from 'react';
import ViewRequestModal from '../Modal/RequestModel/ViewRequestModal';
import { getRequestedProduct } from '../actions/requestAction';
import { useDispatch } from 'react-redux';

const RequestTable = (props) => {
    const [currentRequestId,setCurrentRequestId] =useState('')
    const dispatch=useDispatch();
    
    const { request } = props;
    const reqId = request.request_number;
    const userName = request.user_id.name;
    const dateTime = request.createdAt;
    const requestStatus = request.status;
    const utcDateTime = new Date(dateTime);
    const localTimeString = utcDateTime.toLocaleTimeString();
    const localDateString = utcDateTime.toLocaleDateString();
    const formattedDateTime = `${localTimeString}, ${localDateString}`;

    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle view button click
    const handleViewButtonClick = (request) => {
        const currentRequestId=request.request_id._id
        setCurrentRequestId(currentRequestId)
        dispatch(getRequestedProduct(currentRequestId))
        setIsModalOpen(true); 
    };

    return (
        <Fragment>
            <tr>
                <td>{reqId}</td>
                <td>{userName}</td>
                <td>{formattedDateTime}</td>
                <td>{requestStatus}</td>
                <td>
                    <button className='view-button' onClick={()=>handleViewButtonClick(request)}>View</button>
                    {/* Render the modal if isModalOpen is true */}
                    {isModalOpen && <ViewRequestModal 
                    request={request}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    currentRequestId={currentRequestId}
                    />}
                </td>
            </tr>
        </Fragment>
    );
};

export default RequestTable;
