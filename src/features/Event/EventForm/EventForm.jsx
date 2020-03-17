/* jshint esversion:6*/
/* jshint ignore:start*/
import React, { Component } from 'react'
import { Segment , Image } from 'semantic-ui-react';

class EventForm extends Component {
    render() {
        return (
            <Segment.Group>
                <Segment>Recent Activity</Segment>
                <Segment><Image src='https://picsum.photos/id/10/200/300' size='mini' rounded floated='left'/> List_of_profiles</Segment>
                <Segment><Image src='https://picsum.photos/id/10/200/300' size='mini' rounded floated='left'/> List_of_profiles</Segment>
                <Segment><Image src='https://picsum.photos/id/10/200/300' size='mini' rounded floated='left'/> List_of_profiles</Segment>
                <Segment><Image src='https://picsum.photos/id/10/200/300' size='mini' rounded floated='left'/> List_of_profiles</Segment>
                <Segment><Image src='https://picsum.photos/id/10/200/300' size='mini' rounded floated='left'/> List_of_profiles</Segment>
            </Segment.Group>
        )
    }
}

export default EventForm;