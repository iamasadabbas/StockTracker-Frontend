import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import {getProductQuantity,updateProductQuantity,updateRequestedProductStatus,getRequestedProduct,updateRequestStatus} from '../../actions/requestAction.js';
import { useDispatch,useSelector } from 'react-redux';

import Loader from '../../Loader/Loader.js';
import '../Modal.css'
import { current } from '@reduxjs/toolkit';

const AssignModal = ({ isAssignModalOpen, setIsAssignModalOpen,requestItems,currentRequestId,requestedProduct}) => {
// console.log(requestedProduct);
    const dispatch=useDispatch();
    const requestedProductId=requestItems._id._id;
    const alert =useAlert();
    const {quantity,loading,error} =useSelector((state)=>state.quantity)
    const productAvailableQuantity=quantity
   
    const [assignInput, setAssignInput] = useState('');

    const handleInputChange = (e) => {
        const enteredValue = e.target.value;
        if (enteredValue === '0') {
            setAssignInput('');
            return;
        }
        const newValue = Math.min(parseInt(enteredValue, 10), requestItems?.requested_quantity || 0);
        setAssignInput(newValue.toString());
    }

    const handleAssignSubmit = async () => {
        try {
            const received_quantity=assignInput;
        dispatch(updateRequestedProductStatus(currentRequestId,requestedProductId,received_quantity))

        const remainingQuantity = productAvailableQuantity - assignInput;
          dispatch( updateProductQuantity(currentRequestId, remainingQuantity))
          dispatch(getRequestedProduct(currentRequestId))
         setIsAssignModalOpen(!isAssignModalOpen)
        } catch (error) {
            alert.error(error)
        }
    }
        
        const updateStatus=()=>{

            const allDelivered = requestedProduct.every(product => product.status === 'delivered')
            
           const allDenied = requestedProduct.every(product => product.status === 'denied')
           console.log(allDelivered);
           console.log(allDenied);
        }

    
    const closeIconClick = () => {
        setIsAssignModalOpen(!isAssignModalOpen)
        setAssignInput('')
    }
    useEffect(()=>{
        updateStatus()
        if(error){
            alert.error(error)
        }
        dispatch(getProductQuantity(requestedProductId))
    },[error,requestedProduct])

    


    return (
        <Fragment>
                <Modal className='Modal'
                size='lg'
                isOpen={isAssignModalOpen}
                toggle={() => setIsAssignModalOpen(!isAssignModalOpen)}
                >
                <ModalHeader >
                    <FontAwesomeIcon className='svg-icon' icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={closeIconClick} />
                </ModalHeader>
                {loading ? (<Loader/>):(
                <ModalBody>
                    <table className='table'>
                        <thead>
                            <th>Requested</th>
                            <th>Available</th>
                            <th>Status</th>
                            <th><label>Assign</label></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{requestItems?.requested_quantity}</td>
                                <td>{productAvailableQuantity}</td>
                                <td>{requestItems?.status}</td>
                                <td>
                                    <input
                                        type='number'
                                        max={requestItems?.requested_quantity || 0 }
                                        min={1}
                                        onChange={handleInputChange}
                                        value={assignInput}
                                    disabled={productAvailableQuantity < 1}
                                    >
                                    </input>
                                </td>
    
                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                    <div className='button-div'>
                        {assignInput && <td>
                            <button className='submit_button'
                                onClick={() => { handleAssignSubmit(requestItems?._id, requestItems?._id?.quantity) }}
                                disabled={parseInt(assignInput, 10) > requestItems?.requested_quantity}
                                >
                                submit</button>
                        </td>}
                    </div>
                </ModalBody>
            ) 
            } 
            </Modal>
        </Fragment>
        
    )
}

export default AssignModal
