import React from 'react'
import { Modal } from 'reactstrap'
function LoginModel() {
  return (
    <div>
      <Modal className='modal'
            size='lg'
            isOpen={isLoginModalOpen}
            toggle={() => setIsLoginModalOpen(!isLoginModalOpen)}
        >
            <ModalHeader>
                {/* <FontAwesomeIcon icon={faTimes} style={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsQuantityModalOpen(false)} /> */}
            </ModalHeader>
            <ModalBody>
                <input placeholder='Enter username' onChange={handleUsernameChange}></input>
                <input placeholder='Enter password' onChange={handlePasswordChange}></input>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default LoginModel
