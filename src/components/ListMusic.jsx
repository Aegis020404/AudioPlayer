import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import cl from "../styles/WavePlayer.module.css"
import {useCallback} from "react";
import audioReducer from "../store/audioPlayer-reducer";

const ListMusic = ({list,duration}) => {
    const audio = useRef()
    const dispatch = useDispatch()
    const setMusic = useCallback((el) => dispatch({type: 'SET-MUSIC', el}), [dispatch])


    return (<div>

            <div>
                {list
                    .map((el, i) => <div key={i}
                          className={el.selected ? cl.selected + ' ' + cl.card : cl.card}
                          onClick={() => {
                              if(duration){
                              setMusic(el)
                              } else {
                                  let time = setInterval(()=> {
                                      if(duration){
                                          setMusic(el)
                                          clearInterval(time)
                                      }
                                  },1000)
                              }
                          }}>
                        <audio ref={audio} src={el.src}></audio>
                        <div className={cl.name}>{el.name}</div>
                        <div className={cl.authors}> {el.authors.map((el, i) => <span key={i}> {el} </span>)} </div>
                        <div className={cl.en}>{el.en}</div>
                    </div>)}
            </div>
        </div>);
};

export default ListMusic;