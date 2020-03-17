/* jshint esversion:6 */
/* jshint ignore:start */
import React, { Component } from 'react'
import { Menu, Input, Icon, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignIn from '../../Event/acounts/SignIn';
import Signout from '../../Event/acounts/Signout';

class navbar extends Component {
    render() {
        return (
            <Menu fixed='top'>
                <Container>
                <Menu.Item exact as={NavLink} to='/' name='Revents'><Icon name='gamepad'/>Revents</Menu.Item>
                <Menu.Item  as={NavLink} to='/events' name='Events'/>
                <Menu.Item as={NavLink} to='/people' name='people'/>
                <Menu.Item as={NavLink} to='/test' name='test'/>
                <Menu.Item as={NavLink} to='/eventCreation' name='Create Event'/>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Input size='mini' action='Search' />
                    </Menu.Item>
                    <Menu.Item><SignIn/></Menu.Item>
                    <Menu.Item><Signout/></Menu.Item>
                </Menu.Menu>
                </Container>
            </Menu>
            )
    }
}

export default navbar;