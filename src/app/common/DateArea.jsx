import React from 'react'
import { Form } from 'semantic-ui-react'

const DateArea = ({input: {value, onChange, ...restInput}, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error} >
            <Form.Input name='date' onChange={this.formChangehandler} value={value} placeholder={placeholder} type='date' />
        </Form.Field>
    )
}

export default DateArea