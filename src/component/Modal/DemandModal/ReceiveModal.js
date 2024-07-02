import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addProductQuantityThroughDemand, getDemandById, postReceivedQuantity,updateDemandStatus } from '../../../actions/demandAction';
import { getProductQuantity } from '../../../actions/requestAction';

const ReceiveModal = ({ isReceiveModalOpen, setIsReceiveModalOpen, product, request_id, isApproveModalOpen, setIsApproveModalOpen, locationId }) => {
    const alert = useAlert();
    // const {loading} =useSelector((state)=>state.demandReducer)
    // const { loading, quantity, message, error } = useSelector((state) => state.quantity)
    const dispatch = useDispatch();
    const [receiveInput, setReceiveInput] = useState('');
    const handleInputChange = (e) => {
        const enteredValue = e.target.value;
        if (enteredValue === '0') {
            setReceiveInput('');
            return;
        }
        const newValue = Math.min(parseInt(enteredValue, 10), product?.quantity || 0);
        setReceiveInput(newValue.toString());
    }

    const handleReceiveSubmit = async (product_id) => {
        try {
            dispatch(postReceivedQuantity(request_id, product_id, receiveInput))
            const status = "Approved"
            dispatch(updateDemandStatus(request_id, status))
            const productId = product_id
            //  dispatch(updateProductQuantity(productId,remainingQuantity))
            dispatch(addProductQuantityThroughDemand(locationId, productId, receiveInput))
            setIsReceiveModalOpen(!isReceiveModalOpen)
             setTimeout(() => {
            dispatch(getDemandById(request_id))
             }, 500);

        } catch (error) {
            alert.error(error)
        }
    }
    const handleCloseClick = () => {
        setIsReceiveModalOpen(!isReceiveModalOpen)
    }
    useEffect(() => {
        // console.log(product);
        dispatch(getProductQuantity(product._id._id))
    }, [])

    return (
        <Fragment>
            <Modal className='Modal'
                size='lg'
                isOpen={isReceiveModalOpen}
                toggle={handleCloseClick}
            >
                <ModalHeader >
                    <FontAwesomeIcon className='svg-icon' icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={handleCloseClick} />
                </ModalHeader>
                <ModalBody>
                    <table className='modal-body-table'>
                        <thead>

                            <th>Name</th>
                            <th>Requested</th>
                            <th><label>Receive</label></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product?._id.name}</td>
                                <td>{product?.quantity}</td>
                                <td>
                                    <input
                                        type='number'
                                        max={product?.quantity || 0}
                                        min={1}
                                        onChange={handleInputChange}
                                        value={receiveInput}
                                    >
                                    </input>
                                </td>

                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                    <div className='button-div'>
                        {receiveInput && <td>
                            <button className='submit_button'
                                onClick={() => { handleReceiveSubmit(product?._id._id) }}
                                disabled={parseInt(receiveInput, 10) > product?.quantity}
                            >
                                submit</button>
                        </td>}
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}


export default ReceiveModal
