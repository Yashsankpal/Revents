import { INCREMENT, DECREMENT } from "./testConstants"

const initialState = {
    event:42
  }

export const reducer = (state = initialState,action) => {
  switch(action.type){
    case INCREMENT:
      return {...state, event:state.event+1}
      case DECREMENT:
        return {...state, event:state.event-1}
        default:
          return state
        }
      }