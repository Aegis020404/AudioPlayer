import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import cl from "../styles/WavePlayer.module.css"
import {useCallback} from "react";

const ListMusic = () => {
    const audio = useRef()
    const {listMusicReducer} = useSelector(state => state)
    const dispatch = useDispatch()
    const setMusic = useCallback((src) => dispatch({type: 'SET-MUSIC', src}), [dispatch])
    const setSelected = useCallback((id) => dispatch({type: 'SET-SELECTED', id}), [dispatch])


    return (
        <div>

            <div>
                {
                    listMusicReducer.map((el, i) => <div key={i}
                                                         className={el.selected ? cl.selected + ' ' + cl.card : cl.card}
                                                         onClick={() => {
                                                             setSelected(el.id)
                                                             setMusic(el.src)
                                                         }}>
                        <audio ref={audio} src={el.src}></audio>
                        <div className={cl.name}>{el.name}</div>
                        <div className={cl.authors}> {el.authors.map((el, i) => <span key={i}> {el} </span>)} </div>
                        <div className={cl.en}>{el.en}</div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ListMusic;