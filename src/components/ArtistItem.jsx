import React from 'react'
import '../styles/Home.css' 
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const ArtistItem = ({ArtistName,artist,image,artistId}) => {
  const navigate = useNavigate(); 
  

  const handleArtistClick = () => {
    
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className='card'>
      
        <img src={image} alt={ArtistName} onClick={handleArtistClick} />
        <h5>{ArtistName}</h5> 
        <p>{artist}</p> 
        <button className="play-button" onClick={handleArtistClick}>
        <FaPlay className="play-icon" /> 
      </button>
        

    </div>
  )
}

export default ArtistItem;