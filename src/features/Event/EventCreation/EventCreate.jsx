/*jshint esversion:6*/
/*jshint ignore:start*/
import React, { Component } from 'react'
import { Form , Input, Segment } from 'semantic-ui-react';
import {reduxForm , Field} from 'redux-form'
import { connect } from 'react-redux';
import {createEvent,deleteEvent,updateEvent} from '../../../store/action'
import cuid from 'cuid';
import faker from 'faker'
const mapsStatetoProps = (state)=>({
    list: state.event
  })
  
  const actions = {
    createEvent,
    deleteEvent,
    updateEvent
  }

class EventCreate extends Component {
    state={
        id:null,
        Profile_image:'',
        Name:'',
        date:'',
        address:'',
        description:'',
    }

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
            const {Name,date,address,description} = this.state;
            return (
                <Segment>
            <Form onSubmit={this.toSubmit}>              
                <h4>Event Details</h4>
                <Form.Input name='Name' onChange={this.formChangehandler} value={Name} placeholder='Give your Event name'></Form.Input>
                <Form.TextArea name='address' onChange={this.formChangehandler} value={address} placeholder='Enter address...'></Form.TextArea>
                <h4>Event Location Details</h4>
                <Form.Input name='description' onChange={this.formChangehandler} value={description} placeholder='Description'></Form.Input>
                <Form.Input name='date' onChange={this.formChangehandler} value={date} placeholder='date' type='date' />
                <Form.Group>
                    <Form.Button primary >Submit</Form.Button>
                    <Form.Button secondary onClick={this.props.cancelEvent}>Cancel</Form.Button>
                </Form.Group>
            </Form>
            </Segment>
        )
    }
}

export default connect(mapsStatetoProps,actions)(reduxForm({form:'eventCreate'})(EventCreate));
/*
const options = [
    { key: 1, text: 'Drinks', value: 'Drinks' },
    { key: 2,text: 'Culture',value: 'Culture'},
    { key: 3,text: 'Film',value: 'Film'},
    { key: 4,text: 'Food',value: 'Food'},
    { key: 5,text: 'Travel',value: 'Travel'},
    { key: 6,text: 'Music',value: 'Music'},
]
*/