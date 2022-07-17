import WavePlayer from "./components/WavePlayer";
import ListMusic from "./components/ListMusic";
import FilterListMusic from "./components/FilterListMusic";
import {useSelector} from "react-redux";

function App() {

    const {currentTime, isPlaying, duration, currentMusic} = useSelector(state => state.audioReducer)
    const {list} = useSelector(state => state.audioReducer)


  return (
    <div className="App">
        <WavePlayer currentTime={currentTime} isPlaying={isPlaying} duration={duration} currentMusic={currentMusic}/>
        <FilterListMusic/>
        <ListMusic duration={duration} list={list}/>
    </div>
  );
}

export default App;
