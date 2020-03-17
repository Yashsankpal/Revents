import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class homepage extends Component {
    render() {
        return (
            <div>
                homepage
                <Button primary as={NavLink} to='/events' content='YO YO'/>
            </div>
        )
    }
}

