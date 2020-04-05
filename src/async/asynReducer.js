import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asynConstants"


const initialState = {
    loading: false,
    elementName: null
}

export const reducer = (state = initialState , payload) => {
    switch(payload.type){
      case ASYNC_ACTION_START:
        return {...state,loading:true,elementName:payload.payload}  
      case ASYNC_ACTION_FINISH:
        return {...state,loading:false,elementName:null}
      case ASYNC_ACTION_ERROR:
        return {...state,loading:false,elementName:null}
      default:
              return state
      } 
  }