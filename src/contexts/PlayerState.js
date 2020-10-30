import React, { useReducer, useContext } from 'react'
import playerContext from './playerContext'
import playerReducer from './playerReducer'
import { FileContext } from "../contexts/FileContext";

import {
    SET_CURRENT_SONG,
    TOGGLE_RANDOM,
    TOGGLE_REPEAT,
    TOGGLE_PLAYING,
    SET_SONGS_ARRAY,
} from './types'

const PlayerState = (props) => {
    const [files] = useContext(FileContext);
    const initialState = {
        currentSong: 0,
        songs: files,
        repeat: false,
        random: false,
        playing: false,
        audio: null,
    }
    const [state, dispatch] = useReducer(playerReducer, initialState)

    // Set songs array
    const songsSet = (files) => {
        dispatch({ type: SET_SONGS_ARRAY, data: files })
    }

    // Set playing state
    const togglePlaying = () =>
        dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true })
    // Set current song
    const SetCurrent = (id) => dispatch({ type: SET_CURRENT_SONG, data: id })

    // Prev song
    const prevSong = () => {
        if (state.currentSong === 0) {
            SetCurrent(state.songs.length - 1)
        } else {
            SetCurrent(state.currentSong - 1)
        }
    }
    // Next song
    const nextSong = () => {
        if (state.currentSong === state.songs.length - 1) {
            SetCurrent(0)
        } else {
            SetCurrent(state.currentSong + 1)
        }
    }

    // Repeat and Random
    const toggleRepeat = (id) =>
        dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true })
    const toggleRandom = (id) =>
        dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true })

    // End of Song
    const handleEnd = () => {
        // Check for random and repeat options
        if (state.random) {
            return dispatch({
                type: SET_CURRENT_SONG,
                data: ~~(Math.random() * state.songs.length),
            })
        } else {
            if (state.repeat) {
                nextSong()
            } else if (state.currentSong === state.songs.length - 1) {
                return
            } else {
                nextSong()
            }
        }
    }

    return (
        <playerContext.Provider
            value={{
                currentSong: state.currentSong,
                songs: state.songs,
                repeat: state.repeat,
                random: state.random,
                playing: state.playing,
                audio: state.audio,
                nextSong,
                prevSong,
                SetCurrent,
                toggleRandom,
                toggleRepeat,
                togglePlaying,
                handleEnd,
                songsSet,
            }}
        >
            {props.children}
        </playerContext.Provider>
    )
}

export default PlayerState

