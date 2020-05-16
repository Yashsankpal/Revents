/*jshint esversion:6*/
/*jshint ignore:start*/
/* global google*/
import React, { Component } from 'react'
import { Form , Input, Segment } from 'semantic-ui-react';
import {reduxForm , Field} from 'redux-form'
import { connect } from 'react-redux';
import {createEvent,deleteEvent,updateEvent, cancelToggle} from '../../../store/action'
import cuid from 'cuid';
import faker from 'faker'
import TextArea from '../../../app/common/TextArea';
import TextInput from '../../../app/common/TextInput';
import DateArea from '../../../app/common/DateArea';
import SelectInput from '../../../app/common/SelectInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import TestPlacesInput from '../../../app/common/TestPlacesInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { toastr } from 'react-redux-toastr';
import { withFirestore } from 'react-redux-firebase';
import TimeInput from '../../../app/common/TimeInput';


const mapsStatetoProps = (state,ownProps) => {

    let event = {}

    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events.find(event => ownProps.match.params.id === event.id)||{}
    }

    return {
      initialValues: event,
      event,
    };
  };
const options = [
    { key: 1, text: 'Drinks', value: 'Drinks' },
    { key: 2,text: 'Culture',value: 'Culture'},
    { key: 3,text: 'Film',value: 'Film'},
    { key: 4,text: 'Food',value: 'Food'},
    { key: 5,text: 'Travel',value: 'Travel'},
    { key: 6,text: 'Music',value: 'Music'},
]

const actions = {
    createEvent,
    deleteEvent,
    updateEvent,
    cancelToggle
}
const validate = combineValidators({
    event: isRequired({message:'Requires title'}),
    category: isRequired({message:' Rcategory'}),
    description: composeValidators(
        isRequired({message: 'Required description'}),
        hasLengthGreaterThan(4)({message:'length should be greater than 3'})
    )(),
    date:isRequired({message:'Requires Date'}),
    city:isRequired({message:'Requires City Name'}),
    Venue:isRequired({message:'Requires Venue Address'}),

})
class EventCreate extends Component {
    state = {
        cityLatLng:{},
        venueLatLng:{},
    }

    async componentDidMount(){
        const { firestore , match} = this.props
        let event = await firestore.setListener(`events/${match.params.id}`)
      }

    async componentWillUnmount(){
        const { firestore , match} = this.props
        let event = await firestore.unsetListener(`events/${match.params.id}`)
    }

    toSubmit=async values=>{
        values.venueLatLng = this.state.venueLatLng
        try {
            if(this.props.initialValues.id){
                if(Object.keys(values.venueLatLng).length === 0){
                    values.venueLatLng = this.props.event.venueLatLng
                }
                this.props.updateEvent(values)
                this.props.history.goBack()
            }
            else{
                await this.props.createEvent(values);
                this.props.history.push(`/events`)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    
    handleCitySelect = selectedCity =>{
        geocodeByAddress(selectedCity)
            .then(results => getLatLng(results[0]))
            .then(LatLng => {
                this.setState(
                    {
                        cityLatLng: LatLng
                    }
                )
            })
            .then(() => {
                this.props.change('city',selectedCity)
            })
    }

    handleVenueSelect = selectedVenue =>{
        geocodeByAddress(selectedVenue)
            .then(results => getLatLng(results[0]))
            .then(LatLng => {
                this.setState(
                    {
                        cityLatLng: LatLng
                    }
                )
            })
            .then(() => {
                this.props.change('city',selectedVenue)
            })
    }

    /*<Form.Select options={options} placeholder='What is your event about?'/>*/
    render() {
        const {initialValues,invalid,submitting,pristine,event,cancelToggle} = this.props
        return (
            <Segment>
            <Form onSubmit={this.props.handleSubmit(this.toSubmit)}>              
                <h4>Event Details</h4>
                <Field
                type='text'
                component={TextInput} 
                name='title' 
                placeholder='Enter the title'
                />

                <Field
                type='text' 
                options={options} 
                component={SelectInput} 
                name='category' 
                placeholder='Category' 
                multiple={false}
                />

                <Field 
                type='text'  
                component={TextArea} 
                name='description' 
                placeholder='Describe'
                />

                <h4>Event Location Details</h4>
                

                <Field 
                component={TestPlacesInput} 
                placeholder='Event City' 
                name='city'
                type='text'
                options={{types:['cities']}}
                onSelect={this.handleCitySelect}
                />

                <Field 
                placeholder='Event Venue' 
                component={TestPlacesInput} 
                name='Venue'
                type='text'
                options={{
                    Location: new google.maps.LatLng(this.state.cityLatLng),
                    radius:1000,
                    types:['establishment']
                }}
                onSelect={this.handleVenueSelect} 
                />
                <Form.Group inline>
                <Field 
                name='date' 
                type='date'
                component={DateArea} 
                label='Enter Date'
                />
                <Field
                name='time'
                type='time'
                component={TimeInput}
                label='Enter Time'
                />
                </Form.Group>
                <Form.Group>
                    <Form.Button primary disabled={invalid || submitting || pristine} type='submit'>Submit</Form.Button>
                    <Form.Button  
                    onClick={()=>cancelToggle(!event.cancelled,event.id)} type='Button' color={event.cancelled?'green':'red'}
                    floated='right' content={event.cancelled ? 'Reactivate event ': 'Cancel event '} />
                </Form.Group>

            </Form>
            </Segment>
        )
    }
}

export default withFirestore(connect(mapsStatetoProps,actions)(reduxForm({form:'eventCreate',validate})(EventCreate)));
/*
if(eventId && event.length > 0 ){
    event = event.filter(event => event.id == eventId)[0]
    console.log(event);
    
}
formChangehandler=({target:{name,value}})=>{
    this.setState({
        [name] : value
    })
}

return {
    event
}
eventId=ownProps.match.params.id,
event= state.event,
*/