/* jshint esversion:6*/
/* jshint ignore:start*/
import React, { Component } from 'react';
import EventLists from '../EventList/EventLists';
import EventCreate from '../EventCreation/EventCreate';
import { Button, Grid } from 'semantic-ui-react';
import cuid from 'cuid';
import faker from 'faker';
import EventForm from '../EventForm/EventForm';
import { connect } from 'react-redux';
import {deleteEvent,updateEvent,createEvent} from '../../../store/action'
const mapsStatetoProps = (state)=>({
  list: state.event
})

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}

class EventDashboard extends Component {
  render() {
    const {list}=this.props
    return (
      <Grid>
              <Grid.Column width='10'>
                    {list.map(list=> (
                      <EventLists key={list.id} list={list}></EventLists>
                      ))}
              </Grid.Column>
              <Grid.Column width='6'>
              </Grid.Column>
            </Grid>
        )
      }
    }
    
    export default connect(mapsStatetoProps,actions)(EventDashboard);
    /*
    const {create_status}=this.state;
    state={
      create_status: false
    }
    
      changeStatus = () =>{
            this.setState(({create_status})=>({
                create_status: !create_status
            }))
      }

      addEvent = (aE) =>{
        aE.id = cuid();
        aE.Profile_image = faker.image.avatar();
        this.props.createEvent(aE)
      }
    {!create_status && <Button color='green' onClick={this.changeStatus}>Create Event</Button>}
    {!create_status && <EventForm/>}
    {create_status && <EventCreate Eventadd={this.addEvent} cancelEvent={this.changeStatus}/>}
    */