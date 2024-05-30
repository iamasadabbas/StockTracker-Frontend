import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import { getProductQuantity, updateProductQuantity, updateRequestedProductStatus, getRequestedProduct, updateRequestStatus, clearError } from '../../actions/requestAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRequest } from '../../actions/requestAction.js';

import Loader from '../../Loader/Loader.js';
import '../Modal.css'
import { current } from '@reduxjs/toolkit';

const AssignModal = ({ isAssignModalOpen, setIsAssignModalOpen, requestItems, currentRequestId, requestedProduct }) => {
    const dispatch = useDispatch();
    const product_id = requestItems?._id._id;
    const alert = useAlert();
    const { quantity, loading, error } = useSelector((state) => state.quantity)
    const productAvailableQuantity = quantity

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
        // console.log(currentRequestId);
        try {
            const received_quantity = assignInput;
            const status='delivered'
            dispatch(updateRequestedProductStatus(currentRequestId, product_id, received_quantity,status))
            const remainingQuantity = productAvailableQuantity - assignInput;
            dispatch(updateProductQuantity(product_id, remainingQuantity))
            dispatch(getRequestedProduct(currentRequestId))
            setIsAssignModalOpen(!isAssignModalOpen)
            
        } catch (error) {
            alert.error(error)
        }
    }

    const updateStatus = () => {

            // const allDelivered = requestedProduct?.every(product => product.status === 'delivered')

        //    const allDenied = requestedProduct.every(product => product.status === 'denied')
        //    console.log(allDelivered);
        //    console.log(allDenied);
    }


    const closeIconClick = () => {
        setIsAssignModalOpen(!isAssignModalOpen)
        setAssignInput('')
    }
    useEffect(() => {
        // updateStatus()
        if (error) {
            alert.error(error)
            return () => dispatch(clearError())
        }
        dispatch(getProductQuantity(product_id))
    }, [error, requestItems])




    return (
        <Fragment>
            <Modal className='Modal' size='lg' isOpen={isAssignModalOpen} toggle={() => setIsAssignModalOpen(!isAssignModalOpen)}>
                <ModalHeader>
                    <FontAwesomeIcon className='svg-icon' icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={closeIconClick} />
                </ModalHeader>
                {loading ? (
                    <div className="fullscreen-loader">
                        <Loader />
                    </div>
                ) : (
                    <ModalBody>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Requested</th>
                                    <th>Available</th>
                                    <th>Status</th>
                                    <th><label>Assign</label></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{requestItems?.requested_quantity}</td>
                                    <td>{productAvailableQuantity}</td>
                                    <td>{requestItems?.status}</td>
                                    <td>
                                        <input
                                            type='number'
                                            max={requestItems?.requested_quantity || 0}
                                            min={1}
                                            onChange={handleInputChange}
                                            value={assignInput}
                                            disabled={productAvailableQuantity < 1}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='button-div'>
                            {assignInput && (
                                <button
                                    className='submit_button'
                                    onClick={handleAssignSubmit}
                                    disabled={parseInt(assignInput, 10) > requestItems?.requested_quantity}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </ModalBody>
                )}
            </Modal>
        </Fragment>

    )
}

export default AssignModal
