import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlay, FaHeart } from 'react-icons/fa';
import "../styles/ArtistPage.css";
import axios from "axios";

const ArtistPage = ({updateSong}) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]); 
 
 
  const playSong = (song) => {
    if (updateSong) {
      updateSong(song); // Pass the selected song to the MusicPlayer
    }
  };
  useEffect(() => {
    
  axios
  .get(`http://localhost:8080/api/artist/getArtistDetails/${artistId}`)
  .then((response) => {
    setArtist(response.data);

    if (response.data.songIds && response.data.songIds.length > 0) {
      axios
        .post("http://localhost:8080/api/songs/getSongsByIds", response.data.songIds, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((songResponse) => setSongs(songResponse.data))
        .catch((error) =>
          console.error("Error fetching song details:", error)
        );
    }
  })
  .catch((error) => console.error("Error fetching artist data:", error));

  }, [artistId]);


  if (!artist) {
    return <p>Loading artist...</p>;
  }

  return (
    <div className="artist">
      <div className="artist-info">
        <img src={artist.artistImage} alt={artist.artistName} />
        <div className="artist-stats">
          <h2>{artist.artistName}</h2>
          <h3>85,000 followers</h3>
          <button className="follow-btn">Follow</button>
        </div>
      </div>
      
      

      
      <div className="artist-songs">
        <h3>Popular</h3>
        <ul>
        {songs.map((song) => (
         <li key={song.songId} className="Artistsongitem">
         <div className="Artistsonginfo">
         <img src={song.imageUrl} alt={song.songName} className="Artistsongimage" />
         <div className="Artistsongdetails">
         <p className="Artistsongname">{song.songName}</p>
          <div className="Artistsongactions">
          <div className="play-btn-wrapper">
            <button
            className="play-btn"
            onClick={() => playSong(song)}
          >
            <FaPlay className="play-icon" />
          </button>
          <span className="custom-tooltip">Play Song</span>
          </div>
          <div className="like-btn-wrapper">
          <button
            className="like-btn"
            onClick={() => console.log(`Liked ${song.songName}`)}
            
          >
            <FaHeart className="like-icon" />
            <span className="custom-tooltip">Add to Liked Songs</span>
          </button>
          </div>
        </div>
      </div>
    </div>
     </li>
    ))}

        </ul>
      </div>
      <div className='space'>

     </div>
     
    </div>
    
  );
};

export default ArtistPage;
