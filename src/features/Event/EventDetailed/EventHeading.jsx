import React from 'react'
import { Image, Segment, Button } from 'semantic-ui-react'

function EventHeading({event}) {
    return (
        <Segment.Group size='tiny'>
            <Image src={event.Profile_image}fluid size='massive'/>
            <Segment >
                <Button content='JOIN THIS EVENT' color='teal' size='large'/>
            </Segment>
        </Segment.Group>
    )
}

export default EventHeading
