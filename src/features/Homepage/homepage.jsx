import React, { Component } from 'react'
import { Button, Segment, Container, Header, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class homepage extends Component {
    render() {
        return (
                <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                  <Header as='h1' inverted>
                    Re-vents
                  </Header>
                  <Button size='huge' inverted as={NavLink} to='/events'>
                    Get started
                    <Icon name='right arrow' inverted />
                  </Button>
                </Container>
              </Segment>
        )
    }
}
