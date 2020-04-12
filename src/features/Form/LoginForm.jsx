import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../app/common/TextInput'
import { connect } from 'react-redux'
import { combineValidators, isRequired } from 'revalidate'
import { login} from '../../auth/authActions'


const validate = combineValidators({
    Username: isRequired({message:'Username Please'}),
    Password: isRequired({message:' Password Please'}),
})

const actions = {
    login
}

const LoginForm = ({login,handleSubmit}) => {
    return (
        <Form onSubmit={handleSubmit(login)}>
            <Field 
            type='text' 
            component={TextInput}
            name='email'
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

export default connect(null,actions)(reduxForm({form:'modalForm',validate})(LoginForm))
