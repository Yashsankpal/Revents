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
import DateArea from '../../../app/common/DateArea';
import SelectInput from '../../../app/common/SelectInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';


const mapsStatetoProps = (state,ownProps) => {
    const eventId = ownProps.match.params.id
    let temp= {id:'',description:'',event:'',Name:'',category:''}
    let event= state.event
    
    if(eventId && event.length > 0 ){
      event = event.filter(event => event.id == eventId)[0]
      temp = event
      console.log(temp);  
    }
  
   return {
       eventId,
       initialValues:temp,
       temp
    }
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
    updateEvent
}
const validate = combineValidators({
    event: isRequired({message:'Requires title'}),
    category: isRequired({message:' Rcategory'}),
    description: composeValidators(
        isRequired({message: 'Required description'}),
        hasLengthGreaterThan(4)({message:'length should be greater than 3'})
    )(),
})
class EventCreate extends Component {
    toSubmit=async values=>{
        if(values.id){
            console.log(values);
            this.props.updateEvent(values)
            this.props.history.push(`/detailpage/${values.id}`)
        }
        else{
            values.id=cuid()
            values.Profile_image=faker.image.avatar()
            console.log(values);            
            this.props.createEvent(values);
            this.props.history.push(`/events`)
        }
    }
    
    

    /*<Form.Select options={options} placeholder='What is your event about?'/>*/
    render() {
        const {event,description} = this.props
        return (
            <Segment>
            <Form onSubmit={this.props.handleSubmit(this.toSubmit)}>              
                <h4>Event Details</h4>
                <Field type='text' component={TextInput} name='event' placeholder='Enter the title'/>
                <Field type='text' options={options} component={SelectInput} name='category' placeholder='Category' multiple={false}/>
                <Field type='text'  component={TextArea} name='description' placeholder='Describe'/>
                <h4>Event Location Details</h4>
                <Form.Group>
                    <Form.Button primary type='submit'>Submit</Form.Button>
                    <Form.Button secondary>Cancel</Form.Button>
                </Form.Group>
            </Form>
            </Segment>
        )
    }
}

export default connect(mapsStatetoProps,actions)(reduxForm({form:'eventCreate',validate})(EventCreate));
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