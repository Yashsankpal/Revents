/* jshint esversion:6*/
/*jshint ignore:start*/

import React, { Component } from 'react'
import { Segment, Button , Item} from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

class EventLists extends Component {
    render() {
        const {list} = this.props;
        return (
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image src={list.Profile_image} size='tiny' circular floated='left'/>
                            <Item.Content>
                                <Item.Header>Header</Item.Header>
                                    <Item.Description> Hosted by {list.Name} </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                    <Segment>Date:{list.date}</Segment>
                <Segment>Subscribers</Segment>
                <Segment>{list.description}<Button floated='right' key={list.Name} primary as={NavLink} to={`/detailpage/${list.id}`}>Adios Ameigo</Button></Segment>      
            </Segment.Group>
        )
    }
}

export default EventLists;
