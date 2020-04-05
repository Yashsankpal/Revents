import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../app/common/TextInput'
import { connect } from 'react-redux'
import { combineValidators, isRequired } from 'revalidate'

const validate = combineValidators({
    Username: isRequired({message:'Username Please'}),
    Password: isRequired({message:' Password Please'}),
})

const LoginForm = () => {
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
                <Form.Button color='teal'>Login</Form.Button>
            </Form.Group>
        </Form>    
    )

}

export default connect(null,null)(reduxForm({form:'modalForm',validate})(LoginForm))
