import React, { Component } from 'react'
import { Segment, GridColumn, Grid  ,Image, Button, Menu,Comment,Header,Form } from 'semantic-ui-react'
import EventHeading from './EventHeading'
import EventContacts from './EventContacts'
import EventComments from './EventComments'
import { connect } from 'react-redux'
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase'
import EventDetailedSidbar from './EventDetailedSidbar'
import { objectArray , createDataTree} from '../../../store/helpers'
import {goingToEvent,cancelgoingToEvent} from '../user/userActions'
import {getEventcomment} from '../../../store/action'
import { compose } from 'redux'

const mapsStatetoProps = (state,ownProps)=>{

  const eventId = ownProps.match.params.id 
  let event = {}
  if( state.firestore.ordered.events && state.firestore.ordered.events.length > 0){
    event = state.firestore.ordered.events.filter(event=>event.id === eventId)[0] || {}
    console.log(event.date)  
  }
  const eventChat = !isEmpty(state.firebase.data.event_chat) && 
  objectArray(state.firebase.data.event_chat[ownProps.match.params.id]) 
  console.log(eventChat)
  return {
    event,
    auth:state.firebase.auth,
    eventId,
    eventChat  
  }
}


const actions = {
  goingToEvent,
  cancelgoingToEvent,
  getEventcomment
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
    const {event,auth,goingToEvent,cancelgoingToEvent,getEventcomment,eventId,eventChat} = this.props
    const attendees = event && event.attendees && objectArray(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.find(a => a.id === auth.uid)
    const chatTree  = !isEmpty(eventChat) && createDataTree(eventChat)
    return (
        <Grid>
            <Grid.Column width={9}>
              <EventHeading event={event} isGoing={isGoing} isHost={isHost} goingToEvent={goingToEvent} cancelgoingToEvent={cancelgoingToEvent} />
              <EventContacts event={event}/>
              <EventComments getEventcomment={getEventcomment} eventId={eventId} eventChat={chatTree}/>
            </Grid.Column>
            <Grid.Column width={7}>
              <EventDetailedSidbar attendees={attendees}/>
            </Grid.Column>
        </Grid>
                
    )
  }
}

export default compose(
  withFirestore,
  connect(mapsStatetoProps,actions),
  firebaseConnect((props)=>([`event_chat/${props.match.params.id}`]))
  )
  (EventDetailed)