/* eslint-disable no-unused-expressions */
/* jshint esversion:6 */
/* jshint ignore:start */
import React, { Component } from 'react'
import { Menu, Input, Icon, Container, Button } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal ,closeModal } from '../../../modals/modalActions' 
import Signout from '../../Event/acounts/Signout';
import SignIn from '../../Event/acounts/SignIn';
import { withFirebase } from 'react-redux-firebase';
import {logout} from '../../../auth/authActions'

const options = {
    openModal,
    logout,
    closeModal
}

const mapstate = (state)=>({
    auth : state.auth
})

class navbar extends Component {
    handleLogin=()=>{
        this.props.openModal('LoginModal')
        console.log(this.props.auth)
    }

    handleRegister=()=>{
        this.props.openModal('RegisterModal')
    }

    handleSignOut=()=>{
        this.props.logout()
        this.props.closeModal()
        this.props.history.push('/')
    }

    render() {
        const { auth } = this.props
        const authenticated = auth.authenticated
        return (
            <Menu fixed='top'>
                <Container>
                <Menu.Item exact as={NavLink} to='/' name='Revents'><Icon name='gamepad'/>Revents</Menu.Item>
                <Menu.Item  as={NavLink} to='/events' name='Events'/>
                <Menu.Item as={NavLink} to='/people' name='people'/>
                <Menu.Item as={NavLink} to='/test' name='test'/>
                <Menu.Item as={NavLink} to='/eventCreation' name='Create Event'/>
                { authenticated ?
                    <Menu.Item><SignIn signout={this.handleSignOut} currentUser={auth.currentUser}/></Menu.Item>
                    :
                    <Signout Login={this.handleLogin} Register={this.handleRegister}/>
                }
                  </Container>
            </Menu>
            )
        }
    }
    
    export default withRouter(connect(mapstate,options)(navbar));
    
    /*
    <LoginModal dimmer={true} open={this.state.open} close={this.close}/>
 {authenticated  ? 
                (<Menu.Item><Button  content='Login' onClick={this.show('blurring')} inverted basic close={this.close}/>
                </Menu.Item>)
                :
                (<Menu.Item><Button content='Register' onClick={this.handleRegister} basic inverted /></Menu.Item>)
                }
*/