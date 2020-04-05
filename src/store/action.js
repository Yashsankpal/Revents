import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, INCREMENT, DECREMENT } from "./constant"
import { toastr } from "react-redux-toastr"

export const createEvent = (event) => {
    return async dispatch =>{
        try{
            dispatch({
                type: CREATE_EVENT,
                payload: {
                    event
                }
            })
            toastr.success('Success! event has been created')
        }
        catch(error){
                toastr.error('sorry event was never created')
            }
    }
}

export const deleteEvent = (event) =>{
    return async dispatch=>{
        try{
            dispatch({
                type: DELETE_EVENT,
                payload: {
                    event
                }
            })
            toastr.success('Succes! event has been deleted')
        }
        catch{
            toastr.error('sorry event was not able to be erased')
        }
    }
}

export const updateEvent = (event) =>{
    return async dispatch=>{
        try{
            dispatch({
                type: UPDATE_EVENT,
                payload: {
                    event
                }
            })
            toastr.success('Success! event has been updated')
        }
        catch{
            toastr.error('sorry event was not able to update')
        }
    }
}

