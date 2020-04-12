import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import LoginModal from '../../../modals/LoginModal'
import { connect } from 'react-redux'
import RegisterModal from '../../../modals/RegisterModal'

const mapstate = (state)=>{
    let whichType = false
    if(state.modals){
        const {modalType, modalProps} = state.modals
        whichType = modalType
    }
    return {
        whichType
    }
}




class Signout extends Component {
    render() {
        return (
            <Menu.Item position='right'>
                <Button content='Login' onClick={this.props.Login} basic inverted color='standard'/>
                <Button content='Register' onClick={this.props.Register} basic inverted color='standard'/>
                {
                    this.props.whichType === 'LoginModal' &&
                    <LoginModal open={true} close={this.close}/>
                }
                {
                    this.props.whichType === 'RegisterModal' &&
                    <RegisterModal open={true} close={this.close}/>
                }
            </Menu.Item>
        )
    }
}

export default connect(mapstate,null)(Signout)