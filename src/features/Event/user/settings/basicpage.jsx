import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateArea from "../../../../app/common/DateArea";
import TestPlacesInput from "../../../../app/common/TestPlacesInput";
import TextInput from "../../../../app/common/TextInput";
import RadioInput from  "../../../../app/common/RadioInput";
import moment from 'moment';
import { updateProfile } from '../userActions';
import { addDays } from 'date-fns';

class basicPage extends Component {

    render() {
        const {pristine, submitting, updateProfile,handleSubmit} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                <Form.Group inline>
                    <label>Gender:</label>
                    <Field name='gender' type='radio' value='male' label='Male' component={RadioInput} />
                    <Field name='gender' type='radio' value='female' label='Female' component={RadioInput} />
                </Form.Group>
                    <Field
                        width={8}
                        type='date'
                        name='dateofBirth'
                        component={DateArea}
                        label='Date of Birth'
                     />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={TestPlacesInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile',enableReinitialize:true,  destroyOnUnmount:false })(basicPage);