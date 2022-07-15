import hagiVagi from '../audio/hagiVagi.mp3'
import Rossa from '../audio/Demmywhite_Feat Philip Rossa - I like it.mp3'
import KIDS from '../audio/Влад Бумага - KIDS.mp3'
import RASA from '../audio/RASA - Как ты там_.mp3'
import alors from '../audio/stromae-alors-on-danse.mp3'
import papaoutai from '../audio/stromae-papaoutai.mp3'

import theyDont from '../audio/michael-jackson-they-don039t-care-about-us.mp3'
import criminal from '../audio/michael-jackson-smooth-criminal.mp3'
import earth from '../audio/michael-jackson-earth-song.mp3'



const initialState = [
    {
        id: 1,
        src: hagiVagi,
        name: 'Хаги Ваги',
        authors: ['Jason Swann', 'Eugene Demuckiy'],
        en: 'russian',
        selected: true,

    },


    {
        id: 2,
        src: Rossa,
        name: 'I like it',
        authors: ['Demmywhite ', 'Philip Rossa'],
        en: 'english',
        selected: false,

    },
    {
        id: 3,
        src: RASA,
        name: 'Как ты там',
        authors: ['RASA'],
        en: 'russian',
        selected: false,
    },
    {
        id: 4,
        src: KIDS,
        name: 'KIDS',
        authors: ['Влад Бумага'],
        en: 'russian',
        selected: false,
    },
    {
        id: 5,
        src: alors,
        name: 'alors',
        authors: ['STROMAE'],
        en: 'english',
        selected: false,
    },
    {
        id: 6,
        src: papaoutai,
        name: 'papaoutai',
        authors: ['STROMAE'],
        en: 'english',
        selected: false,
    },
    {
        id: 7,
        src: theyDont,
        name: "they don't care about us",
        authors: ['michael Jackson'],
        en: 'english',
        selected: false,
    },
    {
        id: 8,
        src: criminal,
        name: 'criminal',
        authors: ['michael Jackson'],
        en: 'english',
        selected: false,
    },
    {
        id: 9,
        src: earth,
        name: 'earth',
        authors: ['michael Jackson'],
        en: 'english',
        selected: false,
    },


]


function listMusicReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET-SELECTED': return state.map(el=> el.id === action.id ? {...el, selected:true}: {...el, selected: false})
    }

    return state
}


export default listMusicReducer
