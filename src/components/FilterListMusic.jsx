import React from 'react';
import cl from '../styles/FilterListMusic.module.css'
import {useDispatch} from "react-redux";
import {useCallback} from "react";
const FilterListMusic = () => {
    const dispatch = useDispatch()
    const SORT = useCallback((value) => dispatch({type: 'SORT',value}), [dispatch])

    return (
        <div className={cl.FilterListMusic}>


            <div className={cl.name}>
                <span className='pointer' onClick={() => {SORT('nameA')}  } > A </span>
                &
                <span className='pointer' onClick={() => {SORT('nameZ')}  } > z </span>
            </div>

            <div className={cl.authors}>
                <span className='pointer' onClick={() => {SORT('authorsA')}  } > A </span>
                &
                <span className='pointer' onClick={() => {SORT('authorsZ')}  } > z </span>
            </div>

            <div className={cl.en}>
                <span className='pointer' onClick={() => {SORT('enA')}  } > A </span>
                &
                <span className='pointer' onClick={() => {SORT('enZ')}  } > z </span>
            </div>


        </div>
    );
};

export default FilterListMusic;