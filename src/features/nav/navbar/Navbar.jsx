/* jshint esversion:6 */
/* jshint ignore:start */
import React, { Component } from 'react'
import { Menu, Input, Icon, Container, Button } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../../modals/modalActions' 
import LoginModal from '../../../modals/LoginModal';

const options = {
    openModal
}

class navbar extends Component {
    state={
        authenticated : true,
        open: false 
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
  

    handleLogin=(x)=>{
        this.props.show(x)
    }

    handleRegister=()=>{
        console.log("ORL")
        this.props.openModal('RegisterModal')
    }

    render() {
        const { authenticated } = this.state
        return (
            <Menu fixed='top'>
                <Container>
                <Menu.Item exact as={NavLink} to='/' name='Revents'><Icon name='gamepad'/>Revents</Menu.Item>
                <Menu.Item  as={NavLink} to='/events' name='Events'/>
                <Menu.Item as={NavLink} to='/people' name='people'/>
                <Menu.Item as={NavLink} to='/test' name='test'/>
                <Menu.Item as={NavLink} to='/eventCreation' name='Create Event'/>
                {authenticated  ? 
                (<Menu.Item><Button  content='Login' onClick={this.show('blurring')} inverted basic close={this.close}/>
                </Menu.Item>)
                :
                (<Menu.Item><Button content='Register' onClick={this.handleRegister} basic inverted /></Menu.Item>)
                }
                  <LoginModal dimmer={true} open={this.state.open} close={this.close}/>
                  </Container>
            </Menu>
            )
    }
}

export default withRouter(connect(null,options)(navbar));