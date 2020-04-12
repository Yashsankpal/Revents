/* jshint esversion:6*/
/*jshint ignore:start*/

import React, { Component } from 'react'
import { Segment, Button , Item} from 'semantic-ui-react';
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
                            <Item.Description> Hosted by {list.Name} </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                    <Segment>
                        Date:
                        </Segment>
                <Segment>Subscribers</Segment>
                <Segment>{list.title}<Button floated='right' primary as={NavLink} to={`/detailpage/${list.id}`}>Adios Ameigo</Button></Segment>      
            </Segment.Group>
        )
    }
}

export default EventLists;
