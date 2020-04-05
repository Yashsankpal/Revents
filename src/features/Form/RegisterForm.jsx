import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import TextInput from '../../app/common/TextInput'
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan, hasLengthBetween } from 'revalidate'

const validate = combineValidators({
    Username: isRequired({message:'Enter the Username please'}),
    Password: composeValidators(
        isRequired({message: 'Required description'}),
        hasLengthBetween(3,8)({message:'required length between 3 and 8'})
    )(),
})



class RegisterForm extends Component {
    render() {
        return (
            <Form>
            <Field 
            type='text' 
            component={TextInput}
            name='Username'
            placeholder='Username'/>
            <Field
            type='password'
            component={TextInput}
            name='Password'
            placeholder='Password'/>
            <Form.Group>
                <Form.Button color='teal'>Register</Form.Button>
            </Form.Group>
        </Form>  
        )
    }
}

export default connect(null,null)(reduxForm({form:'modalForm',validate})(RegisterForm))