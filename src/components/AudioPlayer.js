import React from 'react'
import Header from './graphics/Header'
//import Graphics from './graphics/Graphics'
import Controls from './Controls'

import PlayerState from '../contexts/PlayerState'

import '../styles/main.css'
import '../styles/theme.css'

const AudioPlayer = (props) => {
    console.log(props)
    return (
        <PlayerState>
            <div className="main">
                <div className="top">
                    <Header />
                    {/* <Graphics /> */}
                </div>
                <Controls /> 
            </div>
        </PlayerState>
    )
}

export default AudioPlayer
