import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const TimeInput = ({input, width, type, placeholder,label, meta: {touched, error}}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
          {touched && error ? <Label basic color='red'>{error}</Label> :<Label basic color='teal'>{label}</Label>}
        <input {...input} placeholder={placeholder} type={type} 
        />
      </Form.Field>
    )
}

export default TimeInput

