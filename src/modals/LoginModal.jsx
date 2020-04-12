import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import LoginForm from '../features/Form/LoginForm'
import { closeModal } from '../modals/modalActions'
import { connect } from 'react-redux'

const options = {
    closeModal
}

class LoginModal extends Component {
    render() {
        return (
            <Modal size='mini' dimmer={this.props.dimmer} open={true} onClose={this.props.closeModal} closeIcon>
                <Modal.Header>
                    <h1>Login to Re-vents</h1>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default connect(null,options)(LoginModal)
