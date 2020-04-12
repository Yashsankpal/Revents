import React, { Component } from 'react'
import { Segment, GridColumn, Grid  ,Image, Button, Menu,Comment,Header,Form } from 'semantic-ui-react'
import EventHeading from './EventHeading'
import EventContacts from './EventContacts'
import EventComments from './EventComments'
import { connect } from 'react-redux'

const mapsStatetoProps = (state,ownProps)=>{
  const eventId=ownProps.match.params.id
  let event = state.event
  console.log(eventId);
  
  if(eventId && event.length > 0 ){
    event = event.filter(event => event.id == eventId)[0]
    console.log(event);  
  }

  return {
    event
  }
}
function EventDetailed({event}){
        return (
            <Grid>
                <Grid.Column width={9}>
                  <EventHeading event={event}/>
                  <EventContacts event={event}/>
                  <EventComments event={event}/>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Segment>
                        peope going to this event..
                    </Segment>
                </Grid.Column>
            </Grid>
                    
        )
    }


export default connect(mapsStatetoProps)(EventDetailed)