import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
const DateArea = ({input:{value,onChange,onBlur,...restInput}, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
           <DatePicker {...rest} placeholderText={placeholder} onChange={onChange}
           selected={value ? Object.prototype.toString.call(value) !== '[Object value]' ? value.toISOString() : value : null}
           onBlur={(e,val)=>onBlur(val)}
           onchangeRaw={(e)=>e.preventDefault()}
           {...restInput}
        />
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