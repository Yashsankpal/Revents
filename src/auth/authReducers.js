
import { LOGIN_USER,SIGN_OUT_USER } from './authConstants'


const initialState = {
    authenticated : false,
    currentUser:null
}


export const reducer = (state = initialState , payload) => {
    switch(payload.type){
      case LOGIN_USER:
        return{authenticated:true,currentUser:payload.payloads.creds.email}
      case SIGN_OUT_USER:
        return{authenticated:false,currentUser:null}
      default:
        return state
      } 
  }