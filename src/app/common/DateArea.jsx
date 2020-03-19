import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import ReactDatePicker from 'react-datepicker'

const DateArea = ({input: {value, onChange, ...restInput}, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error} >
            <ReactDatePicker {...rest}  placeholderText={placeholder} selected={value ? new Date() : null} dateFormat="YYYY-MM-DD" onChange={onChange} {...restInput}/>
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

export default DateArea
/*
<Field
name="date"
type="text"
component={DateInput}
dateFormat="YYYY-MM-DD HH:mm"
timeFormat="HH:mm"
showTimeSelect
placeholder="Date and Time of Event"
/>
*/