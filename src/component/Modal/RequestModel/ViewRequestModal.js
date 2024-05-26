import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateRequestStatus } from '../../actions/requestAction';
import AssignModal from './AssignModal';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import './ViewRequestModal.css'
import '../Modal.css'

const ViewRequestModal = ({ request, isModalOpen, setIsModalOpen, currentRequestId }) => {
    const { loading, requestedProduct,requestStatus, error } = useSelector((state) => state.requestedProduct)
    // console.log(requestedProduct);
    const alert =useAlert()
    const dispatch=useDispatch();
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [requestItems, setRequestItems] = useState([]);

    // Toggle modal function
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    };
    const handleAssign = (requestedItem) => {
        // console.log(requestedItem);
        setRequestItems(requestedItem)
        setIsAssignModalOpen(true)

    }
    const handleReject = () => {

    }
    
    const checkStatus=()=>{
        
        // console.log(requestedProduct);
        // console.log(requestStatus,currentRequestId);
        // dispatch(updateRequestStatus(currentRequestId,requestStatus))
        
        //  let allDenied = requestedProduct.every(product => product.status === 'denied')
        //  console.log(allDenied);
        //  let allWaiting = requestedProduct.every(product => product.status === 'waiting')
        //  console.log(allWaiting);
        //  let others = requestedProduct.every(product => product.status !== 'waiting')
        //  if(allDelivered){
        //     dispatch(updateRequestStatus(currentRequestId,allDelivered=true,allDenied=false,others=false))
        //  }else if(allDenied){
        //     dispatch(updateRequestStatus(currentRequestId,allDelivered=false,allDenied=true,others=false))
        //  }else if(allWaiting){
        //     return
        //  }else{
        //      dispatch(updateRequestStatus(currentRequestId,allDelivered=false,allDenied=false,others=true))
        //  }
    }
    useEffect(()=>{

        if(error){
            alert.error(error)
        }
        // checkStatus()
    },[error])

    return (
        <>
            {loading ? (
                <Loader />

            ) : (
                <Modal className='Modal' size='lg' isOpen={isModalOpen} toggle={toggleModal}>
                
                    <ModalHeader toggle={toggleModal}>
                        <FontAwesomeIcon className='svg-icon' icon={faTimes} style={{ float: 'right', cursor: 'pointer', }} onClick={toggleModal} />
                        <table className='View_Modal_Table'>
                            <thead>
                                <tr>
                                    <th>{request.request_number}</th>
                                    <th>{request.user_id.name}</th>
                                    <th>{request.status}</th>
                                </tr>
                            </thead>
                        </table>
                    </ModalHeader>
                    <ModalBody>
                        <table className='View_Modal_Table'>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Requested Quantity</th>
                                    <th>Status</th>
                                    {request.status !== "completed" && request.status !== "rejected" ? <th colSpan={2}>Action</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {requestedProduct?.map(requestedItem => (
                                    <tr key={requestedItem._id}>
                                        <td>{requestedItem._id.name}</td>
                                        <td>{requestedItem.requested_quantity}</td>
                                        <td>{requestedItem.status}</td>
                                        {requestedItem.status === "waiting" && (
                                            <>
                                                <td><button className='button' onClick={() => { handleReject(requestedItem._id) }}>Reject</button></td>
                                                <td><button className='button' onClick={() => { handleAssign(requestedItem) }}>Assign</button></td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>

            )}
            {isAssignModalOpen && <AssignModal
                isAssignModalOpen={isAssignModalOpen}
                setIsAssignModalOpen={setIsAssignModalOpen}
                requestItems={requestItems}
                currentRequestId={currentRequestId}
                requestedProduct={requestedProduct}
            />}
        </>
    );

}
export default ViewRequestModal;
