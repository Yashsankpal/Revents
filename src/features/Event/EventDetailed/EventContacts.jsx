import React,{ useState } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import MapDetail from './MapDetail'
import { format ,parseISO } from 'date-fns'

const EventContacts=({event})=>{
    const [isMapOpen,isToggleMap]=useState(false)
    return (
        <Menu vertical fluid>
            <Menu.Item><Icon name='dna' size='large'/></Menu.Item>
            <Menu.Item ><Icon fitted name='calendar' size='large'/>     
                 at </Menu.Item>
            <Menu.Item>
                <Icon size='large' name='location arrow'/>
            
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
