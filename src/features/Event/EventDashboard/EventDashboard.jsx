/* jshint esversion:6*/
/* jshint ignore:start*/
import React, { Component } from 'react';
import EventLists from '../EventList/EventLists';
import {  Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEventsForDashboard } from '../../../store/action'
import { firestoreConnect } from 'react-redux-firebase';
import EventActivity from '../EventActivity/EventActivity';
const mapsStatetoProps = (state)=>({
  event : state.event
})

const actions = {
  getEventsForDashboard
}

class EventDashboard extends Component {
  state={
    moreEvents:true,
    loadingInitial:true,
    loadedEvents:[]
  }
  async componentDidMount(){
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true
      });
    }
    if( next === 0 ){
      this.setState({
        moreEvents:false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.event !== nextProps.event) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.event.slice(0,nextProps.event.length-1)]
      });
    }

  }
  
  getNextEvents = async() =>{
    const {event} = this.props
    let lastEvents = event && event[event.length-2]
    console.log(event[event.length-1])
    let next = await this.props.getEventsForDashboard(lastEvents,event[event.length-1])
    console.log(next+' = next')
    if ( next === 0) {
      this.setState({
        moreEvents:false
      })
    }
    
 }
  render() {
const {loadedEvents} = this.state
    return (
            <Grid>
              <Grid.Column width='10'>
                    { 
                      loadedEvents
                          && 
                      loadedEvents.map(list=> (
                      <EventLists key={list.id} list={list}></EventLists>
                        )
                      )
                    }
                    <Button onClick={this.getNextEvents} disabled={!this.state.moreEvents} content='More' color='green' floated='right'/>
              </Grid.Column>
              <Grid.Column width='6'>
                    <EventActivity/>
              </Grid.Column>
            </Grid>
        )
      }
    }
    
    export default connect(mapsStatetoProps,actions)(firestoreConnect([{collection:'events'}])(EventDashboard));

    