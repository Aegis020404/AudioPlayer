import React, {useCallback, useEffect, useRef} from 'react';
import cl from '../styles/audioplayer.module.css'
import aud from '../audio/hagiVagi.mp3'
import {FaArrowLeft, FaArrowRight, FaPause, FaPlay} from 'react-icons/fa'
import {useDispatch, useSelector} from "react-redux";

const AudioPlayer = () => {

    const dispatch = useDispatch()
    const setIsPlaying = useCallback(() => dispatch({type: 'SET-IS-PLAYING'}), [dispatch])
    const setDuration = useCallback((value) => dispatch({type: 'SET-DURATION', value}), [dispatch])
    const setCurrentTime = useCallback((value) => dispatch({type: 'SET-CURRENT-TIME', value}), [dispatch])



    const {duration, isPlaying, currentTime} = useSelector(state => state.audioReducer)



    //references
    const audioPlayer = useRef(); // reference our audio component
    const progressBar = useRef(); // reference our progress bar
    const animationRef = useRef(); // reference the animation


    useEffect(() => {
        const seconds = ~~(audioPlayer.current?.duration)
        setDuration(seconds)
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedMetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = ~~(secs / 60)
            , returnedMinutes = minutes < 10 ? `0${minutes}` : minutes
            , seconds = secs % 60
            , returnedSeconds = seconds < 10 ? `0${seconds}` : seconds
        return `${returnedMinutes}:${returnedSeconds}`
    }


    const tooglePlay = () => {
        const prevValue = isPlaying
        setIsPlaying()
        if (!prevValue) {
            audioPlayer.current?.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current?.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current?.currentTime;
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)

    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current?.value;
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current?.style.setProperty('--seek-before-width', `${progressBar.current?.value / duration * 100}%`)
        setCurrentTime(progressBar.current?.value)
    }

    const backThirty = () => {
        progressBar.current.value = +(+progressBar.current?.value - 30);
        changeRange()
    }
    const forwardThirty = () => {
        progressBar.current.value = +(+progressBar.current?.value + 30);
        changeRange()
    }

    return (
        <div className={cl.audioPlayer}>


            <button className={cl.ward} onClick={backThirty}><FaArrowLeft/> 30</button>

            <button onClick={tooglePlay} className={cl.playPause}>
                {isPlaying ? <FaPlay className={cl.play}/> : <FaPause/>}
            </button>

            <button className={cl.ward} onClick={forwardThirty}>30 <FaArrowRight/></button>

            <div className={cl.currentTime}>{calculateTime(currentTime)}</div>

            <div>
                <input defaultValue={0} type="range" className={cl.processBar} ref={progressBar}
                       onChange={changeRange}/>
            </div>

            <div className={cl.durationTime}>{duration ? calculateTime(duration) : ''}</div>
        </div>
    );
};

export default AudioPlayer;