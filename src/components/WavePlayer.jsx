import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Wavesurfer from 'react-wavesurfer';
import cl from "../styles/WavePlayer.module.css"
import {FaArrowLeft, FaArrowRight, FaPause, FaPlay} from 'react-icons/fa'
import {MdDoubleArrow} from 'react-icons/md'

const WavePlayer = ({ calculateTime}) => {

    const wave = useRef()
    const audioPlayer = useRef()

    const dispatch = useDispatch()

    const {currentTime, isPlaying, duration, currentMusic} = useSelector(state => state.audioReducer)

    const setIsPlaying = useCallback((value) => dispatch({type: 'SET-IS-PLAYING', value}), [dispatch])
    const setDuration = useCallback((value) => dispatch({type: 'SET-DURATION', value}), [dispatch])
    const setCurrentTime = useCallback((value) => dispatch({type: 'SET-CURRENT-TIME', value}), [dispatch])
    const setNextPrev = useCallback((el,value) => dispatch({type: 'SET-PREV-NEXT-MUSIC', el,value}), [dispatch])


    const onPosWave = (e) => {
        if(audioPlayer?.current?.duration - currentTime < 1) {
            if(duration)
            setNextPrev(currentMusic,'next')
        }
        setCurrentTime(e.originalArgs[0])
    }


    useEffect(() => {
        // setIsPlaying(false)
        setDuration(~~audioPlayer.current.duration)
    }, [audioPlayer?.current?.duration])

    useEffect(()=>{
        setTimeout(()=>{
            setIsPlaying(false)
            dispatch({type: 'SET-IS-PLAYING',value:true})
        },3000)

    },[currentMusic])



    return (
        <div>
            <audio ref={audioPlayer} src={currentMusic.src} preload='metadata'></audio>
            <div className={cl.wave}>

                <Wavesurfer
                    ref={wave}
                    audioFile={currentMusic.src}
                    playing={isPlaying}
                    pos={currentTime}
                    onPosChange={onPosWave}
                />

            </div>

             <div className={cl.control}>
                <div className={cl.currentTime}> {calculateTime(~~currentTime)}</div>


                 <button className={cl.ward+' ' +cl.rotate}  onClick={() => {
                     if(duration)
                     setNextPrev(currentMusic,'prev')
                 }}><MdDoubleArrow/></button>

                <button className={cl.ward} onClick={() => {
                    if (currentTime > 30) {
                        setCurrentTime(currentTime - 30)
                    } else {
                        setCurrentTime(0)
                    }

                }}><FaArrowLeft/></button>
                <button className={cl.playPause} onClick={() => {
                    if(duration)
                        setIsPlaying(!isPlaying)


                }}>
                    {isPlaying ? <FaPlay className={cl.play}/> : <FaPause/>}
                </button>
                <button className={cl.ward} onClick={() => {
                    if(duration)
                    setCurrentTime(currentTime + 30)
                }}><FaArrowRight/></button>

                 <button className={cl.ward} onClick={() => {
                     if(duration) {
                         setIsPlaying(false)
                         setNextPrev(currentMusic, 'next')
                     }
                 }}><MdDoubleArrow/></button>

                <div className={cl.durationTime}> {calculateTime(duration)}</div>
            </div>
        </div>
    );
};

export default WavePlayer;