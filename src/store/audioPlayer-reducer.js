import hagivagi from './../audio/hagiVagi.mp3'


const initialState = {
    isPlaying:false,
    duration:0,
    currentTime:0,
    currentMusic: hagivagi
}


function audioReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET-IS-PLAYING': return {...state,isPlaying: !state.isPlaying}

        case 'SET-DURATION': return {...state,duration: action.value }

        case 'SET-CURRENT-TIME': return {...state,currentTime: action.value }
    }
    return state
}


export default audioReducer
