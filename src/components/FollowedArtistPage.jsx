import React, { useEffect, useState } from 'react'
import followedArtistImage from '../assets/followed_artist.webp';
import '../styles/FollowedArtistPage.css';
import axios from 'axios';

const FollowedArtistPage = () => {

  const[followedArtist,setFollowedArtist] =useState([]);
  const[data,setData]=useState(null);
  const[artist,setArtist]=useState([]);
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

  return (
    
  <div className='FollowedArtistPage'>
      <div className='FollowedArtistPage_header'>
      <img src={followedArtistImage} alt="Followed Artist" className='header_img' />
       <div className='FollowedArtistPage_info'>
      <h2>Followed Artists</h2>
      <h4>data.userName :artists.length Artists</h4>
      </div>
     </div>
      <div className='FollowedArtistPage_body'>
        <h2>Artist List</h2>

      </div>

         
    </div>







    
  )
}

export default FollowedArtistPage