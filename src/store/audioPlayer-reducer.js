import hagivagi from '../audio/hagiVagi.mp3'
import Rossa from '../audio/Demmywhite_Feat Philip Rossa - I like it.mp3'
import KIDS from '../audio/Влад Бумага - KIDS.mp3'
import RASA from '../audio/RASA - Как ты там_.mp3'
import alors from '../audio/stromae-alors-on-danse.mp3'
import papaoutai from '../audio/stromae-papaoutai.mp3'
import theyDont from '../audio/michael-jackson-they-don039t-care-about-us.mp3'
import criminal from '../audio/michael-jackson-smooth-criminal.mp3'
import earth from '../audio/michael-jackson-earth-song.mp3'


const initialState = {
    isPlaying: false, duration: 0, currentTime: 0, currentMusic: {
        id: 0,
        src: hagivagi,
        name: 'Хаги Ваги',
        authors: ['Jason Swann', 'Eugene Demuckiy'],
        en: 'russian',
        selected: true,
    },

    list: [
        {
            id: 0,
            src: hagivagi,
            name: 'Хаги Ваги',
            authors: ['Jason Swann', 'Eugene Demuckiy'],
            en: 'russian',
            selected: true,

        },
        {
            id: 1,
            src: Rossa,
            name: 'I like it',
            authors: ['Demmywhite ', 'Philip Rossa'],
            en: 'russian',
            selected: false,

        }, {
            id: 2, src: RASA, name: 'Как ты там', authors: ['RASA'], en: 'russian', selected: false,
        }, {
            id: 3, src: KIDS, name: 'KIDS', authors: ['Влад Бумага'], en: 'russian', selected: false,
        }, {
            id: 4, src: alors, name: 'alors', authors: ['STROMAE'], en: 'english', selected: false,
        }, {
            id: 5, src: papaoutai, name: 'papaoutai', authors: ['STROMAE'], en: 'english', selected: false,
        }, {
            id: 6,
            src: theyDont,
            name: "they don't care about us",
            authors: ['michael Jackson'],
            en: 'english',
            selected: false,
        }, {
            id: 7, src: criminal, name: 'criminal', authors: ['michael Jackson'], en: 'english', selected: false,
        }, {
            id: 8, src: earth, name: 'earth', authors: ['michael Jackson'], en: 'english', selected: false,
        },


    ]
}
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0

function audioReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET-IS-PLAYING':
            return {...state, isPlaying: action.value}

        case 'SET-DURATION':
            return {...state, duration: action.value}

        case 'SET-CURRENT-TIME':
            return {...state, currentTime: action.value}

        case 'SET-MUSIC':
            return {
                ...state,
                currentMusic: action.el,
                duration: 0,
                currentTime: 0,
                isPlaying: false,
                list: state.list.map(el => el.id === action.el.id ? {...el, selected: true} : {...el, selected: false})
            }

        case 'SET-PREV-NEXT-MUSIC': {
            let side = 'next' === action.value ? 1 : 0
            let index = state.list.map(el => el.id).indexOf(action.el.id)
            index = side ? index + 1 : index - 1
            let sLIsi = state.list[index] ? index : side ? 0 : state.list.length - 1
            // console.log(index)
            // console.log(sLIsi)
            // console.log(state.list[sLIsi])
            return {
                ...state,
                currentMusic: state.list[sLIsi],
                currentTime: 0,
                duration: 0,
                isPlaying: false,
                list: state.list.map(el => el.id === sLIsi ? {...el, selected: true} : {...el, selected: false})
            }
        }


        case 'SORT': {
            let arr = [...state.list]
            switch (action.value) {
                case 'enA': arr.sort((a, b) => compare(a.en, b.en))
                    break;
                case 'enZ': arr.sort((a, b) => compare(b.en, a.en))
                    break;
                case 'authorsA':arr.sort((a, b) => compare(a.authors, b.authors))
                    break;
                case 'authorsZ': arr.sort((a, b) => compare(b.authors, a.authors))
                    break;
                case 'nameA': arr.sort((a, b) => compare(a.name, b.name))
                    break;
                case 'nameZ': arr.sort((a, b) => compare(b.name, a.name))
            }
            arr = arr.map((el, i) => ({...el, id: i}))
            let index = arr.map(el => el.id).indexOf(state.currentMusic.id)
            return {...state, list: arr, currentMusic: {...state.currentMusic, id: index }}
        }
    }
    return state
}


export default audioReducer
