import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./constant"

const events= [
  {       
    id: 0,
    event:'lorem epsum',
    Name: 'Donna Bednar',
    Profile_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg',
    date: '2021-02-03T18:00:00',
    city:'Officiis',
    category:'Drinks',
    Venue:'Officiis reprehender itaque distinctio',
    description: 'Officiis reprehender itaque distinctio itaque.',
    VenueLatLng:{
      lat: 59.95,
      lng: 30.33
    },
    attendees:[]

  },
  {
    id: 1,
    event:'lorem epsum',
    Name: 'Celia Ritchie',
    Profile_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/gonzalorobaina/128.jpg',
    date: '2021-02-03T18:00:00',
    city:'Omnis ullam',
    Venue:'Omnis ullam illo ationem',
    description: 'Omnis ullam illo ationem consequatur sit.',
    category:'Drinks', 
    VenueLatLng:{
      lat: 59.95,
      lng: 30.33
    },
    attendees:[]     
  },
  {
    id: 2,
    event:'lorem epsum',
    Name: 'Lambert Breitenberg',
    Profile_image: 'https://s3.amazonaws.com/uifaces/faces/twitter/vikashpathak18/128.jpg',
    date: '2021-02-03T18:00:00',
    city:'uo repellat',
    Venue:'uo repellat enim magni',
    description: 'uo repellat enim magni aspernatur est.',
    category:'Drinks',
    VenueLatLng:{
      lat: 59.95,
      lng: 30.33
    },
    attendees:[]
  }
]


export const reducer = (state = events , payload) => {
  switch(payload.type){
    case CREATE_EVENT:
      return [...state,payload.payload.event]   
    case UPDATE_EVENT:
      return [...state.filter(event=>event.id !== payload.payload.event.id),payload.payload.event]
    case DELETE_EVENT:
      return [...state.filter(event=>event.id !== payload.payload.event.id)]
    case FETCH_EVENTS:
        return payload.payload.events
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