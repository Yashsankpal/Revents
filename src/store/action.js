import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./constant"
import { toastr } from "react-redux-toastr"
import { createNewEvent } from "./helpers"

export const createEvent = event => 
    async (dispatch,getState,{getFirestore,getFirebase}) =>{
        const firestore = getFirestore()
        const firebase = getFirebase() 
        const user = firebase.auth().currentUser
        const photoURL = getState().firebase.profile.photoURL
        let newEvent = createNewEvent(user,photoURL,event)
        try{
            await firestore.add('events',newEvent)
            toastr.success('Success! event has been created')
        }
        catch(error){
                toastr.error('sorry event was never created')
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
    return async (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore()
        try{
            await firestore.update(`events/${event.id}`,event)
            toastr.success('Success! event has been updated')
        }
        catch{
            toastr.error('sorry event was not able to update')
        }
    }
}

export const cancelToggle = (cancelled,eventId)=>{
    return async (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore()
        const message = cancelled
        ? 'Are you sure you want to cancel the event?'
        : 'This will reactivate the event - are you sure?Ì';
      try {
        toastr.confirm(message, {
          onOk: () =>
            firestore.update(`events/${eventId}`, {
              cancelled: cancelled
            })
        });
        }catch(error){
            console.log(error)
        }
    }
}