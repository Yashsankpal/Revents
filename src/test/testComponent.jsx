import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { Place } from './Place'
import Testmodal from '../modals/Testmodal'
import { asyncIncrementAsync , asyncDecrementAsync } from '../test/testActions'

const mapsStatetoProps = (state)=>({
    data: state.test.event,
    loading : state.async.loading,
    buttonName : state.async.elementName
})

const action = {
    asyncIncrementAsync,
    asyncDecrementAsync
}


class TestComponent extends Component {
    render() {
        const {data, asyncIncrementAsync,asyncDecrementAsync,loading,buttonName} = this.props
        return (
            <div>
                <h3>{data}</h3>
                <Button name='increment' loading={buttonName === 'increment' && loading} onClick={(e)=>asyncIncrementAsync(e.target.name)} content='Increment'/>
                <Button name='decrement' loading={buttonName ==='decrement' && loading} onClick={(e)=>asyncDecrementAsync(e.target.name)} content='Decrement'/>
                <br></br>
                <br></br>
                <Place/>
                <Testmodal/>
            </div>
        )
    }
}

export default connect(mapsStatetoProps,action)(TestComponent)