import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'

const AudioPlayer = (props) => {

    const song = "/Users/cornellbenson/Music/Music/testFolder/Jay-Z ft Damian Marley  - Bam (Transition 100-78 - Clean).mp3"
    return (
        <>
            <div className="main">
                <div className="windowCtr">
                    <span className="appName draggable">Currently Playing:</span>
                </div>
            </div>
            <ReactPlayer url={song} controls={true} />
        </>
    )
}

export default AudioPlayer     
