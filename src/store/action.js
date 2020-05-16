import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from "./constant"
import { toastr } from "react-redux-toastr"
import { createNewEvent } from "./helpers"
import firebase from "../app/config/firebase"
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asynActions"
import moment from "moment"

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

export const getEventsForDashboard = (lastEvent,totalSnap) => 
    async (dispatch,getState)=>{
        let today = new Date()
        today = moment(today).toISOString()
        today = today.split('T')[0]
        console.log(today)
        const firestore = firebase.firestore()
        const event_Query = firestore.collection('events')
        try {
            dispatch(asyncActionStart())
            let startEvent = 
                lastEvent && 
                (await firestore
                    .collection('events')
                    .doc(lastEvent.id)
                    .get())
            let query
            lastEvent 
                ? (query = event_Query.where('date','>=',today).orderBy('date').startAfter(startEvent).limit(2))
                : (query = event_Query.where('date','>=',today).orderBy('date').limit(2))
            
            let eventSnap = await query.get()
            let querySnap = await event_Query.where('date','>=',today).orderBy('date').get()
            
            totalSnap = totalSnap ? totalSnap : querySnap.docs.length
            console.log(totalSnap)
                let events = []
                for(let i = 0;i < eventSnap.docs.length;i++){
                    let evt = {...eventSnap.docs[i].data(),id:eventSnap.docs[i].id}
                    events.push(evt)
                }   
                console.log(totalSnap-eventSnap.docs.length)
                    events.push(totalSnap-eventSnap.docs.length)
                dispatch({type:FETCH_EVENTS,payload:{events}})
                dispatch(asyncActionFinish())
                return totalSnap-eventSnap.docs.length
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError())
        }
    }

export const getEventcomment = (eventId,values,parentId) =>
async (dispatch,getState,{getFirebase})=>{
    const firebase = getFirebase()
    const profile = getState().firebase.profile
    const user = firebase.auth().currentUser
    const newComment = {
        parentId: parentId,
        displayName: profile.displayName,
        photoURL: profile.photoURL || null,
        ui: user.uid,
        text: values.comment,
        date: Date.now()
    }
    try {
        await firebase.push(`event_chat/${eventId}`,newComment)
    } catch (error) {
        console.log(error)
        toastr.error('Oops','Problem adding the comments')
    }
}