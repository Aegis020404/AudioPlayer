import {combineReducers, createStore} from "redux";
import audioReducer from "./audioPlayer-reducer";


const rootReducer = combineReducers({
    audioReducer
})

const store = createStore(rootReducer)

export default store