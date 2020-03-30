import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment , decrement }  from '../store/action'
import { Button } from 'semantic-ui-react'
import { Place } from './Place'

const mapsStatetoProps = (state)=>({
    data: state.event.event
})

const action = {
    increment,
    decrement
}
class TestComponent extends Component {
    render() {
        const {data , increment,decrement} = this.props
        return (
            <div>
                <h3>{data}</h3>
                <Button onClick={increment} content='increment'/>
                <Button onClick={decrement} content='decrement'/>
                <br></br>
                <br></br>
                <Place/>
            </div>
        )
    }
}

export default connect(mapsStatetoProps,action)(TestComponent)