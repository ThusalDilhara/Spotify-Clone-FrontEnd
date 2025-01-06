import React from 'react'
import followedArtist from '../assets/followed_artist.webp';
import '../styles/FollowedArtistPage.css';

const FollowedArtistPage = () => {
  return (
    <div>
      <div className='FollowedArtistPage'>
      <div className='FollowedArtistPage_header'>
      <img src={followedArtist} alt="Followed Artist" className='header_img' />
       <div className='FollowedArtistPage_info'>
      <h2>Followed Artists</h2>
      <h4>data.userName :artists.length Artists</h4>
      </div>
   </div>
         
</div>

    </div>
  )
}

export default FollowedArtistPage