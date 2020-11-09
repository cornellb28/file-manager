import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'

const AudioPlayer = (props) => {
    const { id, path, type} = props
    const initialState = {
        songID: id
    }
    const [audio, setAudio] = useState(initialState)

    console.log(audio)
    return (
        <>
            <div className="main">
                <div className="windowCtr">
                    <span className="appName draggable">Currently Playing:</span>
                </div>
            </div>
            <ReactPlayer url={path} controls={true} />
        </>
    )
}

export default AudioPlayer
