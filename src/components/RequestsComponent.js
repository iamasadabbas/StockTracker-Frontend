import React, { useState } from 'react';
import '../styles/Requests.css';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon

function RequestsComponent(props) {
    const [currentViewId, setCurrentViewId] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const handleView = () => {
        console.log("View clicked for request ID:", props._id);
        setCurrentViewId(props._id);
        setIsViewModalOpen(true);
    };
    const handleAssign = () => {
        setIsAssignModalOpen(true)
    }
    const handleReject = () => {

    }

    return (
        <React.Fragment>
            <tr>
                <td>{props.reqId}</td>
                <td>{props.userName}</td>
                <td>{props.dateTime}</td>
                <td>{props.status}</td>
                <td><button className='view-button' onClick={handleView}>View</button></td>

            </tr>
            <div>
                <Modal className='View-modal'
                    size='lg'
                    isOpen={isViewModalOpen}
                    toggle={() => setIsViewModalOpen(!isViewModalOpen)}
                >
                    <ModalHeader toggle={() => setIsViewModalOpen(!isViewModalOpen)}>
                        <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer'}} onClick={() => setIsViewModalOpen(false)} />
                        <table className='table'>
                            <thead>
                                <th>{props.reqId}</th>
                                <th>{props.userName}</th>
                                <th>{props.dateTime}</th>
                                <th>{props.status}</th>
                            </thead>
                        </table>
                    </ModalHeader>
                    <ModalBody>
                        <table className='table'>
                            <thead>
                                <th>Product-Name</th>
                                <th>ProductCompany</th>
                                <th>Requested-quantity</th>
                                <th colSpan={2}>Action</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>pointer</td>
                                    <td>dell</td>
                                    <td>5</td>
                                    <th><button className='button' onClick={handleReject}>Reject</button></th>
                                    <th><button className='button' onClick={handleAssign}>Assign</button></th>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>
            </div>
            <div>
                <Modal className='Assign-Modal'
                    size='lg'
                    isOpen={isAssignModalOpen}
                    toggle={() => setIsAssignModalOpen(!isAssignModalOpen)}
                >
                    <ModalHeader toggle={() => setIsAssignModalOpen(!isAssignModalOpen)}>
                        <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsAssignModalOpen(false)} />
                    </ModalHeader>
                    <ModalBody>
                        <table className='table'>
                            <thead>
                                <th>Requested</th>
                                <th>Available</th>
                                <th><label>Assign</label></th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2</td>
                                    <td>5</td>
                                    <td><input type='number'></input></td>
                                    <button className='button'>submit</button>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
}

export default RequestsComponent;
