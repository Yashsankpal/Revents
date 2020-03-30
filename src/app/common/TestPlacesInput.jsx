import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Segment, List, Label } from 'semantic-ui-react'
import PlacesAutocomplete from 'react-places-autocomplete'


const TestPlacesInput = ({input:{value,onChange,onBlur}, type, placeholder,options, meta: {touched, error}}) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      searchOptions={options}>
        {({getInputProps,suggestions,getSuggestionsItemProps,loading})=>(
          <Form.Field>
            <input placeholder={placeholder} {...getInputProps({placeholder,onBlur})} />
            {touched && error && <Label basic color='red'>{error}</Label>}
            {suggestions.length > 0 && (
              <Segment>
                {loading && <div>loading...</div> }
                <List selection>
                  { suggestions.map(suggestions=>(
                    <List.Item {...getSuggestionsItemProps(suggestions)}>
                      <List.Header content={suggestions.formattedSuggestion.mainText}/>
                      <List.Description content={suggestions.formattedSuggestion.secondaryText}/>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            )}
          </Form.Field>
        )}
    </PlacesAutocomplete>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPlacesInput)
