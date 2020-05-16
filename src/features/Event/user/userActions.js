import { toastr } from "react-redux-toastr"
import moment from "moment"
import { asyncActionStart , asyncActionFinish, asyncActionError } from "../../../async/asynActions"
import cuid from "cuid"
import firebase from "../../../app/config/firebase"
import { FETCH_EVENTS } from "../../../store/constant"
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "../../../async/asynConstants"

export const updateProfile = (user) =>
async (dispatch,getState,{getFirebase}) => {
    const firebase = getFirebase()
    const { isLoaded, isEmpty, ...updatedUser} = user

    console.log(user)
    if(updatedUser.dateofBirth){
        updatedUser.dateofBirth = moment(updatedUser.dateofBirth).toISOString()
        }
    try {
        await firebase.updateProfile(user)
        toastr.success('Success','Your profile has been updated')
    } catch (error) {
        console.log(error)
    }
}

export const updateProfileImage = (file ,fileName) =>
async (dispatch,getState,{getFirebase,getFirestore}) => {
    const imageName = cuid()
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser
    const path = `${user.uid}/user_images`
    const options = {
        name : imageName
    }
    try {
        let uploadedFile = await firebase.uploadFile(path,file,null,options)
        let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
        let userDoc = await firestore.get(`users/${user.uid}`)

        dispatch(asyncActionStart())
        if (!userDoc.data().photoURL){
            await firebase.updateProfile(
                {
                    photoURL: downloadURL
                }
                )
            await user.updateProfile(
                {
                    photoURL: downloadURL
                }
            )
        }

        await firestore.add(
            {
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos'}]
            },{
                name:imageName,
                url:downloadURL
            }
        )
        dispatch(asyncActionFinish())
    } catch (error) {
        console.log(error)
    }
}

export const deletePhoto = photo => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: photo.id }]
      });
    } catch (error) {
      console.log(error);
      throw new Error('Problem deleting the photo');
    }
  }

export const setMainPhoto = photo => async (dispatch,getState,{getFirebase}) => {
    const firebase = getFirebase()
    try {
        return await firebase.updateProfile(
            {
                photoURL:photo.url
            }
        )
    } catch (error) {
        console.log(error);  
        throw new Error('Problem deleting the photo');
    }
}

export const goingToEvent = (event)=>
async (dispatch,getState,{getFirestore,getFirebase})=>{
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser
    const profile = getState().firebase.profile
    const attendee = {
        going:true,
        joinDate:firestore.FieldValue.serverTimestamp(),
        photoURL: profile.photoURL ||'/assets/user.png',
        displayName:profile.displayName,
        host:false
    }
    try {
        console.log(user)
        await firestore.update(`events/${event.id}`,{
            [`attendees.${user.uid}`]:attendee
        })
        await firestore.set(`event_attendee/${event.id}_${user.uid}`,{
            eventId: event.id,
            userUid: user.uid,
            eventDate:event.date,
            host:false
        })
        toastr.success('Success','u have signed that event')
    } catch (error) {
        toastr.error('Error','Oops failed to sign the event')
    }
}

export const cancelgoingToEvent = (event)=>
async (dispatch,getState,{getFirestore,getFirebase})=>{
    const firebase = getFirebase()
    const firestore = getFirestore()
    const user = firebase.auth().currentUser

    try {
        console.log(user)
        await firestore.update(`events/${event.id}`,{
            [`attendees.${user.uid}`]:firestore.FieldValue.delete()
        })
        await firestore.delete(`event_attendee/${event.id}_${user.uid}`)

        toastr.success('Success','u have signed off that event')
    } catch (error) {
        toastr.error('Error','Oops failed to signoff the event')
    }
}

export const getUserEvent = (hostUid,option)=>
async (dispatch,getState)=>{
    dispatch(asyncActionStart())
    let today = new Date()
    today = moment(today).toISOString()
    today = today.split('T')[0]
    console.log(today)
    console.log(hostUid)
    const firestore = firebase.firestore()
    const eventsRef = firestore.collection('events')
    let k = eventsRef.get()
    console.log(k)
    k = k.docs
    let query
    switch(option){
        case 1: // past events
            query = eventsRef.where('hostUid','==',hostUid).where('date','<=',today).orderBy('date','desc')
            console.log(query)
            break
        case 2: // future events
            query = eventsRef.where('hostUid','==',hostUid).where('date','>=',today).orderBy('date','desc')
            console.log(query)
            break
        default:
            query = eventsRef.where('hostUid','==',hostUid)
            console.log(query)
            break

    } 
    console.log(query)
    try {
        let querySnap = await query.get()
        let events = []
        for(let i=0;i<querySnap.docs.length;i++){
            let evt = {...querySnap.docs[i].data(),id:querySnap.docs[i].id}
            events.push(evt)
        }
        console.log(events)
        if(events.length > 0){
            dispatch({type:FETCH_EVENTS,payload:{events}})
        }
        else{
            return 0
        }
        dispatch(asyncActionFinish())
    } catch (error) {
        console.log(error)
        dispatch(asyncActionError())
    }
}
/*
export const getUserEvents = (userUid, activeTab) => async (
    dispatch,
    getState
  ) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date();
    let eventsRef = firestore.collection('event_attendee');
    let query;
    switch (activeTab) {
      case 1: // past events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '<=', today)
          .orderBy('eventDate', 'desc');
        break;
      case 2: // future events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '>=', today)
          .orderBy('eventDate');
        break;
      case 3: // hosted events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('host', '==', true)
          .orderBy('eventDate', 'desc');
        break;
      default:
        query = eventsRef
          .where('userUid', '==', userUid)
          .orderBy('eventDate', 'desc');
        break;
    }
  
    try {
      let querySnap = await query.get();
      let events = [];
  
      for (let i = 0; i < querySnap.docs.length; i++) {
        let evt = await firestore
          .collection('events')
          .doc(querySnap.docs[i].data().eventId)
          .get();
        events.push({ ...evt.data(), id: evt.id });
      }
  
      dispatch({ type: FETCH_EVENTS, payload: { events } });
  
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
  */