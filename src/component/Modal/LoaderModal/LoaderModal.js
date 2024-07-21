import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './LoaderModal.css'

const LoaderModal = () => {

    return (
        <Fragment>
            <Modal className='Modal' size='lg' isOpen={true}>
                <ModalBody >
                    <div className='Loader_Modal'>
                        <div>


                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default LoaderModal;
