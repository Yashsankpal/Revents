import React, { Component } from 'react'
import { Segment, GridColumn, Grid  ,Image, Button, Menu,Comment,Header,Form } from 'semantic-ui-react'
import EventHeading from './EventHeading'
import EventContacts from './EventContacts'
import EventComments from './EventComments'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { toastr } from 'react-redux-toastr'
import EventDetailedSidbar from './EventDetailedSidbar'
import { objectArray } from '../../../store/helpers'
import { auth } from 'firebase'
import {goingToEvent,cancelgoingToEvent} from '../user/userActions'
import { fromUnixTime } from 'date-fns'
const mapsStatetoProps = (state,ownProps)=>{

  const eventId = ownProps.match.params.id 
  let event = {}

  if( state.firestore.ordered.events && state.firestore.ordered.events.length > 0){
    event = state.firestore.ordered.events.filter(event=>event.id === eventId)[0] || {}
  }
  return {
    event,
    auth:state.firebase.auth
  }
}

const actions = {
  goingToEvent,
  cancelgoingToEvent
}

class EventDetailed extends Component {

  async componentDidMount(){
    const { firestore , match} = this.props
    await firestore.setListener(`events/${match.params.id}`)

  }

  async componentWillUnmount(){
    const { firestore , match} = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }
  render() {
    const {event,auth,goingToEvent,cancelgoingToEvent} = this.props
    const attendees = event && event.attendees && objectArray(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.find(a => a.id === auth.uid) 
    return (
        <Grid>
            <Grid.Column width={9}>
              <EventHeading event={event} isGoing={isGoing} isHost={isHost} goingToEvent={goingToEvent} cancelgoingToEvent={cancelgoingToEvent} />
              <EventContacts event={event}/>
              <EventComments event={event}/>
            </Grid.Column>
            <Grid.Column width={7}>
              <EventDetailedSidbar attendees={attendees}/>
            </Grid.Column>
        </Grid>
                
    )
  }
}

export default withFirestore(connect(mapsStatetoProps,actions)(EventDetailed))