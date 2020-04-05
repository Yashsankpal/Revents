import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react';
import RegisterForm from '../features/Form/RegisterForm';

class RegisterModal extends Component {
    render() {
        return (
            <Modal>
                <Modal.Header>
fdfdfdf
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default RegisterModal;