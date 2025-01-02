import React from 'react'
import '../styles/Home.css' 
import { FaPlay } from 'react-icons/fa';

const SongItem = ({SongName,artistName,image,onClick}) => {
  return (
    <div className='card' onClick={onClick}>
      
        <img src={image} alt={SongName} />
        <h5>{SongName}</h5>
        <p>{artistName}</p>
        <button className="play-button" onClick={onClick}>
        <FaPlay className="play-icon" /> 
      </button>
        

    </div>
  )
}

export default SongItem;