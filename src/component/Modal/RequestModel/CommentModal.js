import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateRequestedProductStatus, clearError } from '../../../actions/requestAction.js';
import Loader from '../../Loader/Loader.js';
import './CommentModal.css';

const CommentModal = ({ isCommentModalOpen, setIsCommentModalOpen, currentRequestId, currentProductId }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error } = useSelector((state) => state.requests);

    const [commentInput, setCommentInput] = useState('');

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const comment = commentInput;
            const status = 'Rejected';
            const received_quantity = 0;
            await dispatch(updateRequestedProductStatus(currentRequestId, currentProductId, received_quantity, status, comment));
            setIsCommentModalOpen(!isCommentModalOpen);
        } catch (error) {
            alert.error('Failed to reject request');
        }
    }

    const closeIconClick = () => {
        setIsCommentModalOpen(!isCommentModalOpen);
        setCommentInput('');
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [error, alert, dispatch]);

    return (
        <Fragment>
            <Modal className='comment-modal' size='lg' isOpen={isCommentModalOpen} toggle={closeIconClick}>
                <ModalHeader className='comment-modal-header'>
                    <FontAwesomeIcon className='svg-icon' icon={faTimes} onClick={closeIconClick} />
                </ModalHeader>
                {loading ? (
                    <div className="fullscreen-loader">
                        <Loader />
                    </div>
                ) : (
                    <ModalBody className='comment-modal-body'>
                        <div className="comment-section">
                            <label htmlFor="comment">Comment : </label>
                            <input
                                type='text'
                                id="comment"
                                onChange={handleCommentChange}
                                value={commentInput}
                            />
                        </div>
                        <div className='button-div'>
                            {commentInput !== '' && (
                                <button
                                    className='submit_button'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </ModalBody>
                )}
            </Modal>
        </Fragment>
    );
}

export default CommentModal;
