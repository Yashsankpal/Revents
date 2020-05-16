import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Field, reduxForm, reset } from 'redux-form'
import TextArea from '../../../app/common/TextArea'

class EventCommentForm extends Component {
    handleCommentSubmit = values => {
        const { getEventcomment, eventId,parentId,closeForm}=this.props
        getEventcomment(eventId,values,parentId)
        reset()
        if(parentId !== 0 ){
            closeForm()
        }
    }
    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
                <Field
                    name = 'comment'
                    type='text'
                    component={TextArea}
                    rows={2}
                />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        )
    }
}
export default reduxForm({Fields:'comment'})(EventCommentForm)