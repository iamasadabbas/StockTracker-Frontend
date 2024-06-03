import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import AssignModal from './AssignModal';
import Loader from '../../Loader/Loader';
import { useAlert } from 'react-alert';
import './ViewRequestModal.css'
import '../Modal.css'
import { getAllRequest,updateRequestedProductStatus,clearError } from '../../../actions/requestAction';
const ViewRequestModal = ({ isModalOpen, setIsModalOpen,currentRequestId }) => {
    const { loading, requestData, error } = useSelector((state) => state.currentRequest)
    // console.log(requestData);
    const alert =useAlert()
    const dispatch=useDispatch();
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [requestItems, setRequestItems] = useState([]);

    // Toggle modal function
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
        dispatch(getAllRequest())

    };
    const handleAssign = (requestedItem) => {
        // console.log(requestedItem);
        setRequestItems(requestedItem)
        setIsAssignModalOpen(true)

    }

    const handleReject = (product_id) => {
        // console.log(product_id);
        const status='rejected'
        const received_quantity=0
            dispatch(updateRequestedProductStatus(currentRequestId, product_id, received_quantity,status))
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
            dispatch(clearError())
        }
        // checkStatus()
    },[error])

    return (
        <Fragment>
            <Modal className='Modal' size='lg' isOpen={isModalOpen} toggle={toggleModal}>
                {loading ? (
                    // <div className="fullscreen-loader">
                        <Loader />
                    // </div>
                ) : (
                    <>
                        <ModalHeader toggle={toggleModal}>
                            <FontAwesomeIcon className='svg-icon' icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={toggleModal} />

                            <table className='View_Modal_Table'>
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
                            <h3 className='heading-productDetails'>Product Details:</h3>
                            <table className='View_Modal_Table'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Requested Quantity</th>
                                        {
                                            requestData.status !== "waiting" &&(<th>Received Quantity</th>)
                                        }
                                        
                                        <th>Status</th>
                                        {/* {request.status !== "completed" && request.status !== "rejected" ? <th colSpan={2}>Action</th> : null} */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestData?.request_id?.product_id?.map(requestedItem => (
                                        <tr key={requestedItem._id}>
                                            <td>{requestedItem._id.name}</td>
                                            <td>{requestedItem.requested_quantity}</td>
                                            {
                                                requestedItem.status !=="waiting" && (<td>{requestedItem.received_quantity || 'N/A'}</td>)
                                            }
                                            
                                            <td>{requestedItem.status}</td>
                                            {requestedItem.status === "waiting" && (
                                                <>
                                                    <td><button className='button' onClick={() => { handleReject(requestedItem._id._id) }}>Reject</button></td>
                                                    <td><button className='button' onClick={() => { handleAssign(requestedItem) }}>Assign</button></td>
                                                </>
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
                isAssignModalOpen={isAssignModalOpen}
                setIsAssignModalOpen={setIsAssignModalOpen}
                requestItems={requestItems}
                currentRequestId={currentRequestId}
            />}
        </Fragment>
    );

}
export default ViewRequestModal;
