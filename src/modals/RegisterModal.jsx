import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react';
import RegisterForm from '../features/Form/RegisterForm';
import { connect } from 'react-redux';
import { closeModal } from '../modals/modalActions'

const options={
    closeModal
}

class RegisterModal extends Component {
    render() {
        return (
            <Modal size='mini' dimmer={this.props.dimmer} open={true} onClose={this.props.closeModal} closeIcon>
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

export default connect(null,options)(RegisterModal);