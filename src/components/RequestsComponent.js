import React, { useEffect, useState } from 'react';
import '../styles/Requests.css';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../pages/axiosInstance';
const URL=process.env.BASE_URL || 'http://localhost:4000'
let config = {
    headers: { 'Content-Type': 'application/json' },
  }

function RequestsComponent(props) {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [allRequest, setAllRequest] = useState([]);
    const [assignInput,setAssignInput]=useState('');
    const handleInputChange=(e)=>{
        setAssignInput(e.target.value);
    }
    const handleAssignSubmit=async(_id,totalQuantity)=>{
        const remainingQuantity=totalQuantity-assignInput;
        const response=await axiosInstance.put(`${URL}/product//updateProductById/${_id}`,{quantity:remainingQuantity},config)

            axiosInstance.put(`${URL}/request/updateRequestStatus/${_id}`,{status:'processing'},config).then((response) => {
                if(response){
                    console.log(response);
                }
             })
            
            
            setIsAssignModalOpen(false)
            alert('updated Successfully')

        
    }

    const handleView = (_id) => {
        axiosInstance.get(`${URL}/request/getProductRequestByRequestId/${_id}`,config).then((response) => {
           const requests= response.data.request[0].request_id.product_id;
           setAllRequest(requests)
        })
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
                <td><button className='view-button' onClick={()=>{handleView(props._id)}}>View</button></td>
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
                                <th>Product Name</th>
                                <th>ProductCompany</th>
                                <th>Requested-quantity</th>
                                <th colSpan={2}>Action</th>
                            </thead>
                            <tbody>
                                {allRequest.map(request => (
                                <tr key={request._id}>
                                    <td>{request._id.name}</td>
                                    <td>{request._id.product_code}</td>
                                    <td>{request.requested_quantity}</td>
                                    <td><button className='button' onClick={()=>{handleReject(request._id)}}>Reject</button></td>
                                    <td><button className='button' onClick={()=>{handleAssign(request._id)}}>Assign</button></td>
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
                            {allRequest.map(request => (
                                <tr>
                                    <td>{request.requested_quantity}</td>
                                    <td>{request._id.quantity}</td>
                                    <td><input type='number' onChange={handleInputChange}></input></td>
                                    <button className='button' onClick={()=>{handleAssignSubmit(request._id._id,request._id.quantity)}}>submit</button>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
}

export default RequestsComponent;
