import React, { useEffect, useState } from 'react'
import followedArtistImage from '../assets/followed_artist.webp';
import '../styles/FollowedArtistPage.css';
import ArtistRow from './ArtistRow'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Footer } from './Footer';

const FollowedArtistPage = () => {

  const[followedArtist,setFollowedArtist] =useState([]);
  const[data,setData]=useState([]);
  const[artist,setArtist]=useState([]);
  const navigate=useNavigate();
  const userId = "6778c203c085eb28fe42fa69";

  useEffect(()=>
  {
    axios.get(`http://localhost:8080/api/users/getFollowedArtist/${userId}`)
    .then((response)=>{
      setFollowedArtist(response.data);


      if(response.data && response.data.length>0){
        axios.post("http://localhost:8080/api/artist/getArtistByIds",response.data,{
          headers:{
            "Content-Type": "application/json",
          },
        })
        .then((response)=>{
          setArtist(response.data);
        })
        .catch((error) => console.error("Error fetching song details:", error));
      }
    })
    .catch((error) => console.error("Error fetching song details:", error));

    axios.get(`http://localhost:8080/api/users/getUserDetails/${userId}`)
    .then((response) => {
     setData(response.data);
    }) 

  },[userId]);

  const handleViewProfile = (artistId) => {
    navigate(`/artist/${artistId}`);
     
    
  };

  const handleUnfollow = (artistId,artistName) => {
    axios
      .delete(`http://localhost:8080/api/users/unfollowArtist/${userId}/${artistId}`)
      .then(() => {
        setFollowedArtist((prev) => prev.filter((id) => id !== artistId));
        setArtist((prev) => prev.filter((artist) => artist.artistId !== artistId));
        toast.success(`Unfollowed ${artistName} successfully!`);
      })
      .catch(() => {
        toast.error("Failed to unfollow the artist.");
      });
  };

  return (
    
  <div className='FollowedArtistPage'>
      <div className='FollowedArtistPage_header'>
      <img src={followedArtistImage} alt="Followed Artist" className='header_img' />
       <div className='FollowedArtistPage_info'>
      <h2>Followed Artists</h2>
      <h4>{data.userName} : Following {artist.length}</h4>
      </div>
     </div>
      <div className='FollowedArtistPage_body'>
        <h2>Artist List</h2>
        {artist.length === 0 ? (
          <p>No followed artists yet.</p>
        ) : (
          artist.map((artist) => (
            <ArtistRow
              key={artist.artistId}
              artist={artist}
              onViewProfile={handleViewProfile}
              onUnfollow={handleUnfollow}
            />
          ))
        )}

<div className="gap"></div>
         <Footer/>
      </div>
      
      
     
    </div>







    
  )
}

export default FollowedArtistPage;