import React, { useEffect, useState } from 'react';
import '../styles/Requests.css';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../pages/axiosInstance';
const URL = process.env.BASE_URL || 'http://localhost:4000'
let config = {
    headers: { 'Content-Type': 'application/json' }
}
function RequestsComponent(props) {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [allRequest, setAllRequest] = useState([]);
    const [assignInput, setAssignInput] = useState('');
    const [currentRequest, setCurrentRequest] = useState([]);
    const [currentRequestId, setCurrentRequestId] = useState([]);
    const [currentRequestedProductId, setCurrentRequestedProductId] = useState([]);
    const [currentCollectionRequestId, setCurrentCollectionRequestId] = useState([]);
    const [productAvailableQuantity, setProductAvailableQuantity] = useState();
    const [currentRequestfor, setCurrentRequestfor] = useState();
    const handleInputChange = (e) => {
        const enteredValue = e.target.value;
        if (enteredValue === '0') {
            setAssignInput('');
            return;
        }
        const newValue = Math.min(parseInt(enteredValue, 10), currentRequest?.requested_quantity || 0);
        setAssignInput(newValue.toString());
    }
    const utcDateTime = new Date(props.dateTime);
    const localTimeString = utcDateTime.toLocaleTimeString();
    const localDateString = utcDateTime.toLocaleDateString();
    const FormattedDateTime = `${localTimeString}, ${localDateString}`
    const handleAssignSubmit = async (_id) => {
        if(assignInput==''){
            alert('Give Inpout first')
            return
        }
        // console.log(currentRequestId);
        console.log(currentRequestedProductId);
        // console.log(_id);
        const remainingQuantity = productAvailableQuantity - assignInput;
        const id = _id._id;
        console.log(id);
        const updateProductQuantity = await axiosInstance.post(`${URL}/productLocation/updateProductQuantityByProductId/${id}`, { quantity: remainingQuantity }, config);
        if (updateProductQuantity) {
            // Update request status
            const updateRequestResponse = await axiosInstance.put(`${URL}/request/updateUserRequestedProductById/${currentRequestId}/${currentRequestedProductId}`, { status: 'delivered', received_quantity: `${assignInput}` }, config);

            if (updateRequestResponse) {
                // Ensure updates are complete before checking product status
                Promise.all([updateProductQuantity, updateRequestResponse]).then(() => {
                    // console.log('entered');
                    // Promise.all([updateProductResponse, updateRequestResponse]).then(() => {
                    checkProductStatus();
                    handleView(currentRequestId);
                    props.onModalComplete();
                    setAssignInput('');
                }).catch(error => {
                    console.error('Error updating product or request:', error);
                });
            }
            handleView(currentRequestId);
            setIsAssignModalOpen(false);
        }

    }
    const checkProductStatus = async () => {
        // console.log(currentCollectionRequestId);
        const allRequestData = await axiosInstance.get(`${URL}/request/getProductRequestByRequestId/${currentRequestId}`, config);
        // console.log(allRequestData);
        // console.log('entered check product status');
        const allRequests = allRequestData.data.request[0].request_id.product_id;
        const allDelivered = allRequests.every(request => request.status === 'delivered')
        const allDenied = allRequests.every(request => request.status === 'denied')
        if (allDenied) {
            axiosInstance.put(`${URL}/request/updateRequestStatus/${currentCollectionRequestId}`, { status: 'rejected' }, config).then((response) => {
                props.onModalComplete();
            }).catch(error => {
                console.error('Error updating request status:', error);
            });
        } else {
            if (allDelivered) {
                axiosInstance.put(`${URL}/request/updateRequestStatus/${currentCollectionRequestId}`, { status: 'receiving' }, config).then((response) => {
                    // console.log('Request status updated to receiving');
                    props.onModalComplete();

                }).catch(error => {
                    console.error('Error updating request status:', error);
                });
            } else {
                axiosInstance.put(`${URL}/request/updateRequestStatus/${currentCollectionRequestId}`, { status: 'processing' }, config).then((response) => {
                    // console.log('Request status updated to processing');
                    props.onModalComplete();

                }).catch(error => {
                    console.error('Error updating request status:', error);
                });
            }
        }
        // console.log(allDelivered);


    }


    const handleView = (_id, requestId) => {
        setCurrentRequestId(_id)
        // console.log(requestId);
        setCurrentCollectionRequestId(requestId)
        getAllRequest(_id);
        setIsViewModalOpen(true);
    };
    const getAllRequest = async (_id) => {
        await axiosInstance.get(`${URL}/request/getProductRequestByRequestId/${_id}`, config).then((response) => {
            const requests = response.data.request[0].request_id.product_id;
            setAllRequest(requests)
        })
    }
    const handleAssign = (request) => {
        setCurrentRequestfor(request.status)
        setCurrentRequestedProductId(request._id._id);
        axiosInstance.get(`${URL}/productLocation/getProductQuantity/${request._id._id}`).then((response) => {
            setProductAvailableQuantity(response.data.request.quantity);
            // console.log(productAvailableQuantity);
        })
        setCurrentRequest(request)
        setIsAssignModalOpen(true)
    }
    const handleReject = async (reqId) => {
        await axiosInstance.put(`${URL}/request/updateUserRequestedProductById/${currentRequestId}/${reqId._id}`, { status: 'denied' }, config).then((response) => {
            if (response) {
                checkProductStatus();
                handleView(currentRequestId);
                props.onModalComplete()
                setIsViewModalOpen(false)
            }
        })
    }


    return (
        <React.Fragment>
            <tr>
                <td>{props.reqId}</td>
                <td>{props.userName}</td>
                <td>{FormattedDateTime}</td>
                <td>{props.status}</td>
                <td><button className='view-button' onClick={() => { handleView(props._id, props.requestId) }}>View</button></td>
            </tr>
            <div>
                <Modal className='View-modal'
                    size='lg'
                    isOpen={isViewModalOpen}
                    toggle={() => setIsViewModalOpen(!isViewModalOpen)}
                >
                    <ModalHeader toggle={() => setIsViewModalOpen(!isViewModalOpen)}>
                        <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsViewModalOpen(false)} />
                        <table className='table'>
                            <thead>
                                <th>{props.reqId}</th>
                                <th>{props.userName}</th>
                                <th>{FormattedDateTime}</th>

                                <th>{props.status}</th>
                            </thead>
                        </table>
                    </ModalHeader>
                    <ModalBody>
                        <table className='table'>
                            <thead>
                                <th>Product Name</th>
                                {/* <th>ProductCode</th> */}
                                <th>Requested-quantity</th>
                                <th>Status</th>

                                {/* {
                                    currentRequestfor == 'waiting'?(
                                        <th colSpan={2}>Action</th>
                                    ):null
                                     } */}
                                {
                                    
                                        props.status !== "completed" && props.status !== "rejected" ?
                                        <th colSpan={2}>Action</th>
                                        : null
                                     }

                            </thead>
                            <tbody>
                                {allRequest.map(request => (
                                    <tr key={request._id}>
                                        <td>{request._id.name}</td>
                                        {/* <td>{request._id.product_code}</td> */}
                                        <td>{request.requested_quantity}</td>
                                        <td>{request.status}</td>
                                        {   
                                            request.status == "waiting" ? <>
                                                <td><button className='button' onClick={() => { handleReject(request._id) }}>Reject</button></td>
                                                <td><button className='button' onClick={() => { handleAssign(request) }}>Assign</button></td>
                                            </> : null}

                                    </tr>
                                ))}
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
                        <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={() => [setIsAssignModalOpen(false), setAssignInput('')]} />
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
                                {/* {allRequest.map(request => ( */}
                                {/* {console.log(currentRequest._id?.quantity)} */}
                                <tr>
                                    <td>{currentRequest?.requested_quantity}</td>
                                    <td>{productAvailableQuantity}</td>
                                    <td>
                                        <input
                                            type='number'
                                            max={currentRequest?.requested_quantity || 0}
                                            min={1}
                                            onChange={handleInputChange}
                                            value={assignInput}
                                            disabled={productAvailableQuantity < 1}
                                        >
                                        </input>
                                    </td>
                                    <td>
                                        <button className='button'
                                            onClick={() => { handleAssignSubmit(currentRequest?._id, currentRequest?._id?.quantity) }}
                                            disabled={parseInt(assignInput, 10) > currentRequest?.requested_quantity}>
                                            submit</button>
                                    </td>
                                </tr>
                                {/* ))} */}
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
}

export default RequestsComponent;
