import React,{ useState } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import MapDetail from './MapDetail'
import { format ,parseISO } from 'date-fns'

function EventContacts({event}) {
    const [isMapOpen,isToggleMap]=useState(false)
    return (
        <Menu vertical fluid>
            <Menu.Item>{event.description}<Icon name='dna' size='large'/></Menu.Item>
            <Menu.Item ><Icon fitted name='calendar' size='large'/>     
                {format(parseISO(event.date),'EEEE do LLL')} at {format(parseISO(event.date),'h:mm a')}</Menu.Item>
            <Menu.Item>
                <Icon size='large' name='location arrow'/>
                {event.city} {event.Venue}
                <Button floated='left' content='Map' size='mini' color='teal' onClick={()=>{isToggleMap(!isMapOpen)}}/>
            </Menu.Item>
            {
                isMapOpen && 
                <Menu.Item>
                    <MapDetail Lat={event.VenueLatLng.lat} Lng={event.VenueLatLng.lng}/>
                </Menu.Item>
            }
        </Menu>
    )
}

export default EventContacts
