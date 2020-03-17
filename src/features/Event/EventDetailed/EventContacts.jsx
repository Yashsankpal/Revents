import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

function EventContacts({event}) {
    return (
        <Menu vertical fluid>
            <Menu.Item>{event.description}<Icon name='dna' size='large'/></Menu.Item>
    <Menu.Item ><Icon fitted name='calendar' size='large'/>{event.date}</Menu.Item>
    <Menu.Item><Icon size='large' name='location arrow'/>{event.address}</Menu.Item>
        </Menu>
    )
}

export default EventContacts
