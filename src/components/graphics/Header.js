import React, { useContext } from 'react'
import playerContext from '../../contexts/playerContext'

function Header() {
  const { currentSong, songs } = useContext(playerContext)
  return (
    <header className="draggable">
      {/* <h3>Now Playing: {songs[currentSong][0]}</h3> */}
      Header
    </header>
  )
}

export default Header
