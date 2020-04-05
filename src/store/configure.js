import { createStore, applyMiddleware } from "redux"
import {devToolsEnhancer, composeWithDevTools} from "redux-devtools-extension"
import rootReducers from "./rootReducers";
import thunk from "redux-thunk";

export const configure=()=>{
    const middlewares = [thunk]
    const composedEnhancer=composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(rootReducers,composedEnhancer);

    return store;
}