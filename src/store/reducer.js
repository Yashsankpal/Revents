import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./constant"

const events= [
  {       
    id: 0,
    Name: 'Donna Bednar',
    Profile_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
    date: '2020-06-27',
    address: 'Molestias aliquid nihil recusandae molestiae dolorem corporis dolores quis eos quam error sed corporis ab.',
    description: 'Officiis reprehender itaque distinctio itaque.'
  },
  {
    id: 1,
    Name: 'Celia Ritchie',
    Profile_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/gonzalorobaina/128.jpg',
    date: '2021-02-03',
    address: 'Vel est nemo a ipsum architecto voluptas voluptatem exercitationem tenetur et quia dolores ut consectetur.',
    description: 'Omnis ullam illo ationem consequatur sit.'      
  },
  {
    id: 2,
    Name: 'Lambert Breitenberg',
    Profile_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/vikashpathak18/128.jpg',
    date: '2020-06-16',
    address: 'Amet et beatae itaque omnis quos nemo ducimus et vel tempore quia qui commodi est.',
    description: 'uo repellat enim magni aspernatur est.'
  }
]


export const reducer = (state = events,payload) => {
  switch(payload.type){
    case CREATE_EVENT:
      return [...state,payload.payload.event]   
    case UPDATE_EVENT:
      return [...state.filter(event=>event.id !== payload.payload.event.id)]
    case DELETE_EVENT:
      return [...state.filter(event=>event.id !== payload.payload.event.id),payload.payload.event]
    default:
            return state
    } 
}
        
        /*
        
        export  const cEvent=(state,payload)=>{
          return [...state,payload.event]
        }
        
        export  const dEvent=(state,payload)=>{
          return [...state.filter(event=>event.id !== payload.event.id),payload.event]
          }
          
        export const uEvent=(state,payload)=>{
          return [...state.filter(event=>event.id !== payload.event.id)]
          }
  export default eventReducer(events,{
    [CREATE_EVENT]: cEvent,
    [UPDATE_EVENT]: uEvent,
    [DELETE_EVENT]: dEvent
  })
  
  import { INCREMENT, DECREMENT } from "./constant";
  
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
*/