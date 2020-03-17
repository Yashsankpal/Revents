import React from 'react'
import { Image, Segment, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function EventHeading({event}) {
    return (
        <Segment.Group size='tiny'>
            <Image src={event.Profile_image}fluid size='massive'/>
            <Segment >
                <Button content='JOIN THIS EVENT' color='teal' size='large'/>
                <Button content='Update Event' color='teal' size='large' floated='right'  as={NavLink} to={`/eventCreation/${event.id}`}/>
            </Segment>
        </Segment.Group>
    )
}

export default EventHeading
