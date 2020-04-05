import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import LoginForm from '../features/Form/LoginForm'

class LoginModal extends Component {
    render() {
        return (
            <Modal size='mini' dimmer={this.props.dimmer} open={this.props.open} onClose={this.props.close} closeIcon>
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

export default LoginModal
