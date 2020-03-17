import { createStore } from "redux"
import rootReducers from "./rootReducers";

export const configure=()=>{
    const store = createStore(rootReducers);

    return store;
}