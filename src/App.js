import WavePlayer from "./components/WavePlayer";
import ListMusic from "./components/ListMusic";
import FilterListMusic from "./components/FilterListMusic";

function App() {

    const calculateTime = (secs) => {
        const minutes = ~~(secs / 60)
            , returnedMinutes = minutes < 10 ? `0${minutes}` : minutes
            , seconds = secs % 60
            , returnedSeconds = seconds < 10 ? `0${seconds}` : seconds
        return `${returnedMinutes}:${returnedSeconds}`
    }

  return (
    <div className="App">
        <WavePlayer calculateTime={calculateTime} />
        <FilterListMusic/>
        <ListMusic/>
    </div>
  );
}

export default App;
