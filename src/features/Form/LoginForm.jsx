import React, { Component } from 'react'
import { Form, Button,Label, Divider, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../app/common/TextInput'
import { connect } from 'react-redux'
import { combineValidators, isRequired } from 'revalidate'
import { login , socialLogin} from '../../auth/authActions'
import { SocialLogin } from '../Event/acounts/SocialLogin'


const validate = combineValidators({
    Username: isRequired({message:'Username Please'}),
    Password: isRequired({message:' Password Please'}),
})

const actions = {
    login,
    socialLogin
}

const LoginForm = ({login,handleSubmit,error,invalid,submitting,pristine,socialLogin}) => {
    return (
        <Form onSubmit={handleSubmit(login)}>
            <Segment>
            <Field 
            type='text' 
            component={TextInput}
            name='email'
            placeholder='Username'/>
            <Field
            type='password'
            component={TextInput}
            name='password'
            placeholder='Password'/>
            {error && <Label basic color='red'>{error}</Label>}
            <Button fluid color='teal' disabled={invalid || submitting || pristine}>Login</Button>
            <Divider content='OR' horizontal />
            <SocialLogin socialLogin={socialLogin}/>
            </Segment>
        </Form>    
    )

}

export default connect(null,actions)(reduxForm({form:'modalForm',validate})(LoginForm))
