import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
const DateArea = ({input:{value,onChange,onBlur,...restInput},type,label, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            {touched && error ? <Label basic color='red'>{error}</Label> :<Label basic color='teal'>{label}</Label>}
           <input 
           {...rest}
           type={type} placeholder={placeholder}
           onChange={onChange}
           onBlur={(e,val)=>onBlur(val)}
           value = {value}
           onchangeRaw={(e)=>e.preventDefault()} 
           onFocus={type='text'}
           {...restInput}
           />
        </Form.Field>
    )
}

export default DateArea
/*
<DatePicker {...rest} placeholderText={placeholder} onChange={onChange}
selected={value ? moment(new Date(value)).toDate() :null}
onBlur={(e,val)=>onBlur(val)}
onchangeRaw={(e)=>e.preventDefault()}
{...restInput}
/>
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