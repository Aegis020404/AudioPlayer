import {combineReducers, createStore} from "redux";
import audioReducer from "./audioPlayer-reducer";
import listMusicReducer from "./listMusic-reducer";


const rootReducer = combineReducers({
    audioReducer,
    listMusicReducer
})

const store = createStore(rootReducer)
window.store = store
export default store