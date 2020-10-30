import React, { useContext } from 'react'
import playerContext from '../../contexts/PlayerContext'

function Playlist() {
    const { SetCurrent, currentSong, songs } = useContext(playerContext)
    return (
        <div className="playlist no_drag">
            <div className="header">
                <i className="fas fa-list-ul"></i>
                <span className="pltext">Play List</span>
            </div>
            <ul className="loi">
                {songs.map((song, i) => (
                    <li
                        className={'songContainer ' + (currentSong === i ? 'selected' : '')}
                        key={i}
                        onClick={() => {
                            SetCurrent(i)
                        }}
                    >
                        <i className="fas fa-music"></i>
                        <span className="song">{song[0]}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Playlist
