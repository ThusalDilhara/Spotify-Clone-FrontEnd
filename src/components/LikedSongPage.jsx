import {React,useEffect,useState} from 'react'
import '../styles/ArtistPage.css'
import likedSong from '../assets/liked_Song.jpg';
import '../styles/LikedSongPage.css'
import SongRow from './SongRow';
import axios from 'axios';

const LikedSongPage = ({updateSong}) => {

  const[likedSongs, setLikedSongs] = useState([]);
  const userId = "6778c203c085eb28fe42fa69";
  
  const playSong = (song) => {
    if (updateSong) {
      updateSong(song);
    }
  };
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/users/getlikedSongs/${userId}`)
    .then((response) => {
      setLikedSongs(response.data);
    })
    .catch((error) => console.error("Error fetching song details:", error));
  })

  const handleLikedSong = (songId, songName) => {
    const isLiked = likedSongs.includes(songId);

    if (isLiked) {
      axios
        .delete(`http://localhost:8080/api/users/removeLikedSong/${userId}/${songId}`)
        .then(() => {
          setLikedSongs((prevLikedSongs) =>
            prevLikedSongs.filter((id) => id !== songId)
          );
          toast.success(`Removed ${songName} from liked songs`);
        })
        .catch(() => {
          toast.error("Failed to remove song from liked songs");
        });
    } else {
      axios
        .post("http://localhost:8080/api/users/likeSong", null, {
          params: { userId, songId },
        })
        .then(() => {
          setLikedSongs((prevLikedSongs) => [...prevLikedSongs, songId]);
          toast.success(`Liked ${songName}`);
        })
        .catch(() => {
          toast.error("Failed to add song to liked songs");
        });
    }
  };

  return (
    <div className='LikedSongPage'>
      <div className='LikedSongPage_header'>
         <img src={likedSong} alt="LikedSong Image" />
          <div className='LikedSongPage_info'>
            <h2>Liked Songs</h2>
            <h4>UserName : No of Songs</h4>
          </div>
      </div>
      <div className='LikedSongPage_body'>
        <h2>Song List </h2>
        {likedSongs.length===0?
             (<p>You Haven't Liked any Song Yet...</p>):
        (
           <ul>
            {likedSongs.map((song) => (
              <SongRow
                  key={song.songId}
                  song={song}
                  isLiked={likedSongs.includes(song.songId)}
                  onPlay={playSong}
                  onLikeToggle={handleLikedSong}/>

            ))}
           </ul>      
             
        
        )  }
             

     
        </div>
       
        <div className="space"></div>




    </div>
  )
}

export default LikedSongPage;