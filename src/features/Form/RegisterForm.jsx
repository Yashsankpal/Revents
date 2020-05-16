import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Button, Segment, Label, Divider } from 'semantic-ui-react'
import TextInput from '../../app/common/TextInput'
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan, hasLengthBetween } from 'revalidate'
import { registerUser , socialSignup } from '../../auth/authActions'
import { invalid } from 'moment'
import { SocialLogin } from '../Event/acounts/SocialLogin'

const validate = combineValidators({
    Username: isRequired({message:'Enter the Username please'}),
    Password: composeValidators(
        isRequired({message: 'Required description'}),
        hasLengthBetween(3,8)({message:'required length between 3 and 8'})
    )(),
})

const actions = {
    registerUser,
    socialSignup
}

const RegisterForm= ({error ,handleSubmit,registerUser,invalid,submitting,pristine,socialSignup})=> {
    return (
      <Form onSubmit={handleSubmit(registerUser)}>
          <Segment>
            <Field
              name="displayName"
              type="text"
              component={TextInput}
              placeholder="Known As"
            />
            <Field
              name="email"
              type="text"
              component={TextInput}
              placeholder="Email"
            />
            <Field
              name="password"
              type="password"
              component={TextInput}
              placeholder="Password"
            />
            {error && <Label basic color='red'>{error}</Label>}
            <Button fluid size="large" color="teal" disabled={invalid || submitting || pristine}>
              Register
            </Button>
            <Divider content='OR' horizontal />
            <SocialLogin socialSignup={socialSignup} name='SignUp'/>
          </Segment>
        </Form>
    );

}

export default connect(null,actions)(reduxForm({form:'modalForm',validate})(RegisterForm))





