import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const DateArea = ({input, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error} >
           <DatePicker {...rest} placeholdertext={placeholder} onChange={input.onChange} onBlur={input.onBlur}
           selected={input.value ? new Date(input.value) : null}
           onChangeRaw={(e)=>e.preventDefault()}/>
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