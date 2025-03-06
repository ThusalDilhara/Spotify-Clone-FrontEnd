import React from 'react'
import '../styles/Home.css' 
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const PlaylistItem = ({title,desc,img,playlistId}) => {
  const navigate = useNavigate(); 

  const handlePlaylistClick = () => {
   
    navigate(`/playlist/${playlistId}`);
  };
  return (
    <div className='card'>
        <img src={img} alt={title}  onClick={handlePlaylistClick} />
        <h5>{title}</h5>
        <p>{desc}</p>
        <button className="play-button" onClick={handlePlaylistClick}>
               <FaPlay className="play-icon" /> 
              </button>
        

    </div>
  )
}

export default PlaylistItem;