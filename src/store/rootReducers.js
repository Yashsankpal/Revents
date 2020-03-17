import { combineReducers } from "redux";
import { reducer } from "./reducer";
import { reducer as Formreducer} from 'redux-form'

const rootReducers = combineReducers({
    form : Formreducer,
    event : reducer    
})

export default rootReducers