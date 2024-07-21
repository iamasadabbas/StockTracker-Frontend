import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './UpdateUserModal.css'; // Import your custom styles here

const UpdateUserModal = ({
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    inputName,
    inputEmail,
    inputPhone_no,
    handleChangeName,
    handleChangeEmail,
    handleChangePhone_no,
    handleUpdate
}) => {
    const [initialValues, setInitialValues] = useState({ name: '', email: '', phone_no: '' });

    useEffect(() => {
        if (isUpdateModalOpen) {
            setInitialValues({ name: inputName, email: inputEmail, phone_no: inputPhone_no });
        }
    }, [isUpdateModalOpen, inputName, inputEmail, inputPhone_no]);

    const toggleModal = () => {
        setIsUpdateModalOpen(!isUpdateModalOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate({
            name: inputName,
            email: inputEmail,
            phone_no: inputPhone_no
        });
        setIsUpdateModalOpen(false);
    };

    const isChanged = () => {
        return (
            inputName !== initialValues.name ||
            inputEmail !== initialValues.email ||
            inputPhone_no !== initialValues.phone_no
        );
    };

    return (
        <Modal isOpen={isUpdateModalOpen} className='Update_Modal'>
            <ModalHeader className='modal-header'>
                <FontAwesomeIcon icon={faTimes} onClick={toggleModal} className='svg-icon' />
                <h3 className='update_user_heading'>Update User</h3>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit} className='large-form'>
                    <label className='label'>Name</label>
                    <input
                        className='input'
                        required
                        type='text'
                        value={inputName}
                        onChange={handleChangeName}
                        placeholder='Enter username here'
                    />
                    <br />
                    <label className='label'>Email</label>
                    <input
                        className='input'
                        required
                        type='email'
                        value={inputEmail}
                        onChange={handleChangeEmail}
                        placeholder='Enter email here'
                    />
                    <br />
                    <label className='label'>Phone No</label>
                    <input
                        className='input'
                        required
                        type='text'
                        value={inputPhone_no}
                        onChange={handleChangePhone_no}
                        placeholder='Enter phone number here'
                    />
                    <br />
                    <div className='button-div'>
                        <button
                            className='update_submit_button'
                            type='submit'
                            disabled={!isChanged()}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default UpdateUserModal;
