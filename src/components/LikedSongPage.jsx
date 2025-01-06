import {React,useEffect,useState} from 'react'
import '../styles/ArtistPage.css'
import likedSongImage from '../assets/liked_Song.jpg';
import '../styles/LikedSongPage.css'
import SongRow from './SongRow';
import axios from 'axios';
import { toast } from "react-toastify";
import { Footer } from './Footer';

const LikedSongPage = ({updateSong}) => {

  const[likedSongs, setLikedSongs] = useState([]);
  const [songs, setSongs] = useState([]);
  const[data,setData]=useState([]);
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
    
    

    if (response.data && response.data.length > 0) {
      axios
        .post("http://localhost:8080/api/songs/getSongsByIds", response.data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((songResponse) => setSongs(songResponse.data))
        .catch((error) => console.error("Error fetching song details:", error));
    }
   })
   .catch((error) => console.error("Error fetching artist data:", error));

   axios.get(`http://localhost:8080/api/users/getUserDetails/${userId}`)
   .then((response) => {
     setData(response.data);
   })  

  },[userId]);

    const handleLikedSong = (songId, songName) => {
      axios
        .delete(`http://localhost:8080/api/users/removeLikedSong/${userId}/${songId}`)
        .then(() => {
          setLikedSongs((prevLikedSongs) =>
            prevLikedSongs.filter((id) => id !== songId)
          );
          setSongs((prevSongs) =>
            prevSongs.filter((song) => song.songId !== songId)
          );
  
          toast.success(`Removed ${songName} from liked songs`);
        })
        .catch(() => {
          toast.error("Failed to remove song from liked songs");
        });
    }
    
  

  return (
    <div className='LikedSongPage'>
      <div className='LikedSongPage_header'>
         <img src={likedSongImage} alt="LikedSong Image" className='header_img' />
          <div className='LikedSongPage_info'>
            <h2>Liked Songs</h2>
            <h4>{data.userName} : {songs.length} Songs</h4>
          </div>
      </div>
      <div className='LikedSongPage_body'>
        <h2>Song List </h2>
        {songs.length===0?
             (<p>You Haven't Liked any Song Yet...</p>):
        (
           <ul>
            {songs.map((song) => (
              <SongRow
                  key={song.songId}
                  song={song}
                  isLiked={true}
                  onPlay={playSong}
                  onLikeToggle={handleLikedSong}/>

            ))}
           </ul>          
        )  }
        </div>
       
        <div className="gap"></div>
       
         <Footer/>
    </div>
  )
}

export default LikedSongPage;