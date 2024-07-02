import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductQuantity, updateProductQuantity, updateRequestedProductStatus, clearError } from '../../../actions/requestAction.js';

import Loader from '../../Loader/Loader.js';
import '../Modal.css';

const AssignModal = ({ isAssignModalOpen, setIsAssignModalOpen, requestItems, currentRequestId, requestedProduct, event }) => {
    const dispatch = useDispatch();
    const product_id = requestItems?._id._id;
    const alert = useAlert();
    const { quantity, loading, error } = useSelector((state) => state.quantity);
    const productAvailableQuantity = quantity;

    const [assignInput, setAssignInput] = useState('');
    const [commentInput, setCommentInput] = useState('');

    const handleInputChange = (e) => {
        // console.log(e.target.value);
        const enteredValue = e.target.value;
        if (enteredValue === '0') {
            setAssignInput('');
            return;
        }else if(enteredValue === '') {
            setAssignInput('')
            return
        }{

        }
        const newValue = Math.min(parseInt(enteredValue, 10), requestItems?.requested_quantity || 0);
        setAssignInput(newValue.toString());
    }

    const handleAssignSubmit = async () => {
        let remainingQuantity;
        const received_quantity = assignInput;
        try {
            if(event){
                const editedQuantity=requestItems?.received_quantity-assignInput
             remainingQuantity = productAvailableQuantity + editedQuantity;
            }else{
                remainingQuantity = productAvailableQuantity - received_quantity;
            }
            const status = 'assigned';
            const comment=commentInput

            // Wait for each dispatch to complete before proceeding to the next
            dispatch(updateRequestedProductStatus(currentRequestId, product_id, received_quantity, status,comment));
            dispatch(updateProductQuantity(product_id, remainingQuantity));

            setIsAssignModalOpen(!isAssignModalOpen);

        } catch (error) {
            alert.error(error);
        }
    }

    const closeIconClick = () => {
        setIsAssignModalOpen(!isAssignModalOpen);
        setAssignInput('');
    }
    const handleCommentChange=(e)=>{
        setCommentInput(e.target.value)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            return () => dispatch(clearError());
        }
        dispatch(getProductQuantity(product_id));
    }, [error, requestItems]);

    useEffect(() => {
        if (requestItems) {
            setAssignInput(requestItems.received_quantity?.toString() || '');
        }
    }, [requestItems]);

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
                        <table className='modal-body-table'>
                            <thead>
                                <tr>
                                    <th>Requested Quantity</th>
                                    <th>Available Quantity</th>
                                    <th>Request Status</th>
                                    {
                                        event ? (
                                            <th><label>Received</label></th>
                                        ) : (
                                            <th><label>Assign</label></th>
                                        )
                                    }
                                    <th>Comment</th>
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
                                    <td>
                                        <input
                                            type='text'
                                            onChange={handleCommentChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='button-div'>
                            {assignInput !=='' && (
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

export default AssignModal;
