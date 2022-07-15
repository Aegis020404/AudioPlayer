import {combineReducers, createStore} from "redux";
import audioReducer from "./audioPlayer-reducer";


const rootReducer = combineReducers({
    audioReducer,
})

const store = createStore(rootReducer)
window.store = store
export default store