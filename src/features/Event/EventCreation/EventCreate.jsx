/*jshint esversion:6*/
/*jshint ignore:start*/
import React, { Component } from 'react'
import { Form , Input, Segment } from 'semantic-ui-react';
import {reduxForm , Field} from 'redux-form'
import { connect } from 'react-redux';
import {createEvent,deleteEvent,updateEvent} from '../../../store/action'
import cuid from 'cuid';
import faker from 'faker'
import TextArea from '../../../app/common/TextArea';
import TextInput from '../../../app/common/TextInput';
const options = [
    { key: 1, text: 'Drinks', value: 'Drinks' },
    { key: 2,text: 'Culture',value: 'Culture'},
    { key: 3,text: 'Film',value: 'Film'},
    { key: 4,text: 'Food',value: 'Food'},
    { key: 5,text: 'Travel',value: 'Travel'},
    { key: 6,text: 'Music',value: 'Music'},
]

const mapsStatetoProps = (state,ownProps)=>{
    const eventId=ownProps.match.params.id
    let temp={
        id:null,
        Profile_image:'',
        Name:'',
        date:'',
        address:'',
        description:'',
    }

    if(eventId && state.length > 0 ){
        temp = state.filter(event => event.id == eventId)[0]

    }
    
    return {

        temp

    }
   
};

const actions = {
    createEvent,
    deleteEvent,
    updateEvent
}

class EventCreate extends Component {
    
    toSubmit=(x)=>{
        this.setState({id:cuid()})
        this.setState({Profile_image: faker.image.avatar() })
        this.props.createEvent(this.state);
    }
    
    formChangehandler=({target:{name,value}})=>{
        this.setState({
            [name] : value
        })
    }
    
    /*<Form.Select options={options} placeholder='What is your event about?'/>*/
    render() {
        const {Name,date,address,description} = this.props;
        return (
            <Segment>
            <Form onSubmit={this.toSubmit}>              
                <h4>Event Details</h4>
                <Field type='text' component={TextInput} name='Title' placeholder='Enter the title'/>
                <Field type='text' component={TextArea} name='Description' placeholder='Describe'/>
                <h4>Event Location Details</h4>
                <Form.Input name='date' onChange={this.formChangehandler} value={date} placeholder='date' type='date' />
                <Form.Group>
                    <Form.Button primary >Submit</Form.Button>
                    <Form.Button secondary>Cancel</Form.Button>
                </Form.Group>
            </Form>
            </Segment>
        )
    }
}

export default connect(mapsStatetoProps,actions)(reduxForm({form:'eventCreate'})(EventCreate));
/*
if(eventId && event.length > 0 ){
    event = event.filter(event => event.id == eventId)[0]
    console.log(event);
    
}

return {
    event
}
eventId=ownProps.match.params.id,
event= state.event,
*/