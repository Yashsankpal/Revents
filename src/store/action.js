import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, INCREMENT, DECREMENT } from "./constant"

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event
        }
    }
}

export const deleteEvent = (event) =>{
    return{
        type: DELETE_EVENT,
        payload: {
            event
        }
    }
}

export const updateEvent = (event) =>{
    return{
        type: UPDATE_EVENT,
        payload: {
            event
        }
    }
}

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