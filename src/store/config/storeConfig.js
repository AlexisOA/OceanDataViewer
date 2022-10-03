import { createStore } from "redux"
import { rootReducer } from "../reducers/rootReducer";
 export const createAppStore = () => {
    
    let store = createStore(rootReducer)
    // store.subscribe(()=> console.log(store));
    return store;
 }