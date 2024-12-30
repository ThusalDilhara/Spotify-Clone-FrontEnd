import React from 'react'
import '../styles/Home.css' 

const SongItem = ({SongName,artistName,image}) => {
  return (
    <div className='card'>
        <img src={image} alt={SongName} />
        <h5>{SongName}</h5>
        <p>{artistName}</p>
        

    </div>
  )
}

export default SongItem;