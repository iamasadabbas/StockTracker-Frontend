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
            <Modal className="Modal" size="lg" isOpen={isModalOpen} toggle={toggleModal}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <ModalHeader>
                            <FontAwesomeIcon className="svg-icon" icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={toggleModal} />
                            <table className="View_Modal_Table">
                                <thead>
                                    <tr>
                                        <th>{requestData?.request_number}</th>
                                        <th>{requestData?.user_id?.name}</th>
                                        <th>{requestData?.status}</th>
                                    </tr>
                                </thead>
                            </table>
                        </ModalHeader>
                        <ModalBody>
                            <h3 className="heading-productDetails">Product Details:</h3>
                            <table className="View_Modal_Table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Requested Quantity</th>
                                        {requestData.status !== "Requested" && <th>Received Quantity</th>}
                                        <th>Status</th>
                                        {requestData.status !== "Requested" && <th>comment</th>}
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
                                                    <td><button className="submit_button" onClick={() => handleReject(requestedItem._id._id)}>Reject</button></td>
                                                    <td><button className="submit_button" onClick={() => handleAssign(requestedItem)}>Assign</button></td>
                                                </>
                                            ) : (
                                                requestData.status !== 'Completed' && (
                                                    <td><button className="submit_button" onClick={() => handleEdit(requestedItem)}>Edit</button></td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </ModalBody>
                    </>
                )}
            </Modal>
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
