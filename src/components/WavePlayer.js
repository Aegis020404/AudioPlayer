import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Wavesurfer from 'react-wavesurfer';

import cl from "../styles/WavePlayer.module.css"
import {FaArrowLeft, FaArrowRight, FaPause, FaPlay} from 'react-icons/fa'

const WavePlayer = () => {

    const wave = useRef()
    const audioPlayer = useRef()

    const dispatch = useDispatch()

    const {currentTime, isPlaying, duration, currentMusic} = useSelector(state => state.audioReducer)

    const setIsPlaying = useCallback(() => dispatch({type: 'SET-IS-PLAYING'}), [dispatch])
    const setDuration = useCallback((value) => dispatch({type: 'SET-DURATION', value}), [dispatch])
    const setCurrentTime = useCallback((value) => dispatch({type: 'SET-CURRENT-TIME', value}), [dispatch])

    const onPosWave = (e) => {
        setCurrentTime(e.originalArgs[0])
    }

    useEffect(() => {
        setDuration(~~audioPlayer.current.duration)
    },[audioPlayer?.current?.duration])

    const calculateTime = (secs) => {
        const minutes = ~~(secs / 60)
            , returnedMinutes = minutes < 10 ? `0${minutes}` : minutes
            , seconds = secs % 60
            , returnedSeconds = seconds < 10 ? `0${seconds}` : seconds
        return `${returnedMinutes}:${returnedSeconds}`
    }

    return (
        <div>
            <audio ref={audioPlayer} src={currentMusic} preload='metadata'></audio>
            <div className={cl.wave}>
                <Wavesurfer
                    ref={wave}
                    audioFile={currentMusic}
                    playing={isPlaying}
                    pos={currentTime}
                    onPosChange={onPosWave}
                />
            </div>

            <div className={cl.control}>
                <div className={cl.currentTime}> {calculateTime(~~currentTime)}</div>

                <button className={cl.ward} onClick={() => {
                    if (currentTime > 30) {
                        setCurrentTime(currentTime - 30)
                    } else {
                        setCurrentTime(0)
                    }

                }}><FaArrowLeft/></button>
                <button className={cl.playPause} onClick={() => {
                    console.log(wave.current);
                    setIsPlaying()
                }}>
                    {isPlaying ? <FaPlay className={cl.play}/> : <FaPause/>}
                </button>
                <button className={cl.ward} onClick={() => {
                    setCurrentTime(currentTime + 30)
                }}><FaArrowRight/></button>

                <div className={cl.durationTime}> {calculateTime(duration)}</div>
            </div>
        </div>
    );
};

export default WavePlayer;