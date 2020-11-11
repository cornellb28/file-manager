import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
const url = window.require('url');

console.log(url)
const AudioPlayer = ({ filepath, id, type }) => {
    const string = filepath
    let u = string ? url.pathToFileURL(string) : ''
    const song = u.href
    return (
        <>
            <div className="main">
                <div className="windowCtr">
                    <span className="appName draggable">Currently Playing:</span>
                </div>
                <ReactPlayer url={song} controls={true} />
            </div>

        </>
    )
}

export default AudioPlayer      
