import { INCREMENT, DECREMENT } from "./testConstants"
import { asyncActionStart, asyncActionFinish } from "../async/asynActions"
import { ASYNC_ACTION_START } from "../async/asynConstants"

export const increment = ()=>{
    return {
        type: INCREMENT
    }
}

export const decrement = ()=>{
    return {
        type: DECREMENT
}
}


const delay = (ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms))
}

export const asyncIncrementAsync = (name) =>{
    return async dispatch => {
        dispatch({type:ASYNC_ACTION_START,payload:name})
        await delay(1000)
        dispatch(increment())
        dispatch(asyncActionFinish())
    }
}

export const asyncDecrementAsync = (name) =>{
    return async dispatch => {
        dispatch({type:ASYNC_ACTION_START,payload:name})
        await delay(1000)
        dispatch(decrement())
        dispatch(asyncActionFinish())
    }
}