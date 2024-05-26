import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ReceiveModal from './ReceiveModal';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { getDemandById } from '../../actions/demandAction';

const ApproveModal = ({ isApproveModalOpen, setIsApproveModalOpen, request_id }) => {
    const dispatch=useDispatch();
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const {loading,error,currentDemand}=useSelector((state)=>state.allDemand)
    const isAllProductReceived = currentDemand?.products?.every(product => product.received_quantity !== null);
    console.log(currentDemand.products);

    const handleReject = (id) => {
        console.log(id);
    };

    const handleReceive = (product) => {
        console.log('entered');
        setProduct(product);
        setIsReceiveModalOpen(!isReceiveModalOpen);
    };

    const clickCloseIcon = () => {
        setIsApproveModalOpen(!isApproveModalOpen);
    };

    return (
        <div>
            {
                loading ?(
                    <Loader/>
                ):(
                    <Modal className='Modal'
                size='lg'
                isOpen={isApproveModalOpen}
                toggle={clickCloseIcon}
            >
                <ModalHeader toggle={clickCloseIcon}>
                    <FontAwesomeIcon className='svg-icon' icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={clickCloseIcon} />
                    <table className='View_Modal_Table'>
                        <thead>
                            <tr>
                                <th>{currentDemand?.applicationId}</th>
                                <th>{currentDemand?.date}</th>
                                <th>{currentDemand?.status}</th>
                            </tr>
                        </thead>
                    </table>
                </ModalHeader>
                <ModalBody>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Requested-quantity</th>
                                <th>Received-quantity</th>
                                {
                                    !isAllProductReceived && (<th colSpan={1}>Action</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {currentDemand.products?.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.received_quantity || 'N/A'}</td>
                                    {!product.received_quantity && (
                                        <td><button className='button' onClick={() => { handleReceive(product) }}>Receive</button></td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
                )
            }
            <div>
                {isReceiveModalOpen && <ReceiveModal
                    isReceiveModalOpen={isReceiveModalOpen}
                    setIsReceiveModalOpen={setIsReceiveModalOpen}
                    isApproveModalOpen={isApproveModalOpen}
                    setIsApproveModalOpen={setIsApproveModalOpen}
                    product={product}
                    request_id={request_id}
                />}
            </div>
        </div>
    );
};

export default ApproveModal;
