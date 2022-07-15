import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Wavesurfer from 'react-wavesurfer';
import cl from "../styles/WavePlayer.module.css"
import {FaArrowLeft, FaArrowRight, FaPause, FaPlay} from 'react-icons/fa'

const WavePlayer = ({ calculateTime}) => {

    const wave = useRef()
    const audioPlayer = useRef()

    const dispatch = useDispatch()

    const {currentTime, isPlaying, duration, currentMusic, isReady} = useSelector(state => state.audioReducer)

    const setIsPlaying = useCallback((value) => dispatch({type: 'SET-IS-PLAYING', value}), [dispatch])
    const setDuration = useCallback((value) => dispatch({type: 'SET-DURATION', value}), [dispatch])
    const setCurrentTime = useCallback((value) => dispatch({type: 'SET-CURRENT-TIME', value}), [dispatch])


    const onPosWave = (e) => {
        setCurrentTime(e.originalArgs[0])
    }


    useEffect(() => {
            setDuration(~~audioPlayer.current.duration)
    }, [audioPlayer?.current?.duration])

    useEffect(()=>{
        setTimeout(()=>{
            dispatch({type: 'SET-IS-PLAYING',value:true})
        },3000)

    },[currentMusic])



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
                <button className={cl.playPause} onClick={(e) => {
                    if(wave.current.state.isReady) {
                        setIsPlaying(!isPlaying)
                    } else {
                        let item = setInterval(()=> {
                            if(wave.current.state.isReady){
                                setIsPlaying(!isPlaying)
                                clearInterval(item)
                            }
                        },500)
                    }

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