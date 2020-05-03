/* jshint esversion:6*/
/*jshint ignore:start*/

import React, { Component } from 'react'
import { Segment, Button , Item, Label} from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { format } from 'date-fns';

class EventLists extends Component {
    render() {
        const {list} = this.props;
        return (
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image src={list.Profile_image} size='small' floated='left'/>
                            <Item.Content>
                            <Item.Header>{list.event}</Item.Header>
                            <Item.Description> Hosted by {list.hostedBy} </Item.Description>
                            {
                                list.cancelled &&
                                <Label 
                                style={{top:'-40px'}}
                                ribbon='right'
                                color='red'
                                content='this event has been cancelled'/>
                            }
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                    <Segment>
                        Date: Sorry currently not working
                        </Segment>
                <Segment>Subscribers</Segment>
                <Segment>Description: {list.description}<Button floated='right' primary as={NavLink} to={`/detailpage/${list.id}`}>Adios Ameigo</Button></Segment>      
            </Segment.Group>
        )
    }
}

export default EventLists;
