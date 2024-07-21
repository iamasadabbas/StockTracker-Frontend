import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ReceiveModal from './ReceiveModal';
import Loader from '../../Loader/Loader';
// import './ViewRequestModal.css';
import '../Modal.css';

const ApproveModal = ({ isApproveModalOpen, setIsApproveModalOpen, request_id }) => {
    const dispatch = useDispatch();
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const { loading, error, currentDemand } = useSelector((state) => state.allDemand);
    const isAllProductReceived = currentDemand?.products?.every(product => product.received_quantity !== null);

    const handleReject = (id) => {
        console.log(id);
    };

    const handleReceive = (product) => {
        setProduct(product);
        setIsReceiveModalOpen(!isReceiveModalOpen);
    };

    const clickCloseIcon = () => {
        setIsApproveModalOpen(!isApproveModalOpen);
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Modal className="Modal" size="lg" isOpen={isApproveModalOpen} toggle={clickCloseIcon}>
                    <ModalHeader>
                        <FontAwesomeIcon className="svg-icon" icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={clickCloseIcon} />
                    </ModalHeader>
                    <ModalBody>
                        <div className="Request_Details_Modal_tables">
                            <table className="Request_Details_Modal_table">
                                <tbody>
                                    <tr>
                                        <th>Application ID</th>
                                        <td>{currentDemand?.applicationId}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{currentDemand?.date}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{currentDemand?.status}</td>
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
                                            {currentDemand.status !== 'Pending' && <th>Received Quantity</th>}
                                            {!isAllProductReceived && <th>Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentDemand.products?.map(product => (
                                            <tr key={product._id}>
                                                <td>{product._id.name}</td>
                                                <td>{product.quantity}</td>
                                                {currentDemand.status !== 'Pending' && <td>{product.received_quantity}</td>}
                                                {!product.received_quantity && (
                                                    <td><button className="button" onClick={() => handleReceive(product)}>Receive</button></td>
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
            {isReceiveModalOpen && (
                <ReceiveModal
                    isReceiveModalOpen={isReceiveModalOpen}
                    setIsReceiveModalOpen={setIsReceiveModalOpen}
                    isApproveModalOpen={isApproveModalOpen}
                    setIsApproveModalOpen={setIsApproveModalOpen}
                    product={product}
                    request_id={request_id}
                    locationId={currentDemand.locationId}
                />
            )}
        </Fragment>
    );
};

export default ApproveModal;
