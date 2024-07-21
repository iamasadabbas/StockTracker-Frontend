import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AssignModal from './AssignModal';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import './ViewRequestModal.css';
import '../Modal.css';
import CommentModal from './CommentModal';
import { getAllRequest, updateRequestedProductStatus, clearError, getRequestById } from '../../../actions/requestAction';
import LoaderModal from '../LoaderModal/LoaderModal';

const ViewRequestModal = ({ isModalOpen, setIsModalOpen, currentRequestId }) => {
    const { loading, requestData, error } = useSelector((state) => state.requests);
    const alert = useAlert();
    const dispatch = useDispatch();
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [requestItems, setRequestItems] = useState([]);
    const [currentProductId, setCurrentProductId] = useState('');
    const [event, setEvent] = useState();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAssign = (requestedItem) => {
        setRequestItems(requestedItem);
        setIsAssignModalOpen(true);
    };

    const handleReject = (product_id) => {
        setIsCommentModalOpen(true);
        setCurrentProductId(product_id);
    };

    const handleEdit = (requestedItem) => {
        setEvent('Edit');
        setRequestItems(requestedItem);
        setIsAssignModalOpen(true);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [error, alert, dispatch]);

    return (
        <Fragment>
            {loading ? (
                    <LoaderModal />
            ) : (
                    <Modal className="Modal" size="lg" isOpen={isModalOpen} toggle={toggleModal}>
                        <ModalHeader>
                            <FontAwesomeIcon className="svg-icon" icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={toggleModal} />
                        </ModalHeader>
                        <ModalBody>
                            <div className="Request_Details_Modal_tables">
                                <table className="Request_Details_Modal_table">
                                    <tbody>
                                        <tr>
                                            <th>Request Number</th>
                                            <td>{requestData?.request_number}</td>
                                        </tr>
                                        <tr>
                                            <th>Requested By</th>
                                            <td>{requestData?.user_id?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Request Status</th>
                                            <td>{requestData?.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="View_Modal_Table_div">
                                <div className="View_Modal_Table_wrapper">
                                    <table className="View_Modal_Table">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Requested Quantity</th>
                                                {requestData.status !== "Requested" && <th>Received Quantity</th>}
                                                <th>Status</th>
                                                {requestData.status !== "Requested" && <th>Comment</th>}
                                                {requestData.status !== "Completed" && <th colSpan={2}>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requestData?.request_id?.product_id?.map(requestedItem => (
                                                <tr key={requestedItem._id}>
                                                    <td>{requestedItem._id.name}</td>
                                                    <td>{requestedItem.requested_quantity}</td>
                                                    {requestData.status !== "Requested" && <td>{requestedItem.received_quantity}</td>}
                                                    <td>{requestedItem.status}</td>
                                                    {requestData.status !== "Requested" && <td>{requestedItem.comment}</td>}
                                                    {requestedItem.status === "waiting" ? (
                                                        <>
                                                            <td><button className="button" onClick={() => handleReject(requestedItem._id._id)}>Reject</button></td>
                                                            <td><button className="button" onClick={() => handleAssign(requestedItem)}>Assign</button></td>
                                                        </>
                                                    ) : (
                                                        requestData.status !== 'Completed' && (
                                                            <td><button className="button" onClick={() => handleEdit(requestedItem)}>Edit</button></td>
                                                        )
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
            )}
            {isAssignModalOpen && <AssignModal
                event={event}
                isAssignModalOpen={isAssignModalOpen}
                setIsAssignModalOpen={setIsAssignModalOpen}
                requestItems={requestItems}
                currentRequestId={currentRequestId}
            />}
            {isCommentModalOpen && <CommentModal
                isCommentModalOpen={isCommentModalOpen}
                setIsCommentModalOpen={setIsCommentModalOpen}
                currentProductId={currentProductId}
                currentRequestId={currentRequestId}
            />}
        </Fragment>
    );
};

export default ViewRequestModal;
