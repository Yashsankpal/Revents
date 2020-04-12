import { createStore, applyMiddleware } from "redux"
import {devToolsEnhancer, composeWithDevTools} from "redux-devtools-extension"
import rootReducers from "./rootReducers";
import {reactReduxFirebase ,getFirebase} from 'react-redux-firebase'
import {getFirestore, reduxFirestore} from 'redux-firestore'
import thunk from "redux-thunk";
import firebase from '../app/config/firebase'

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile:true
}

export const configure=()=>{
    const middlewares = [thunk.withExtraArgument({ getFirebase , getFirestore })]
    const middleware = applyMiddleware(...middlewares)
    const storeEnhancer = [middleware]
    const composedEnhancer = composeWithDevTools(
        ...storeEnhancer,
        reactReduxFirebase(firebase,rrfConfig),
        reduxFirestore(firebase)
    )
    const store = createStore(rootReducers,composedEnhancer);

    return store;
}