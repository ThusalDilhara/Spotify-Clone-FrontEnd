import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import Navbar from './navbar';
import AlbumItem from './PlaylistItem';
import SongItem from './SongItem';
import ArtistItem from './artistItem';
import { Footer } from './Footer';
import { Link, useNavigate } from "react-router-dom";



const Home = ({ updateSong }) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists,setPlaylists] = useState([]);
 
  const userId = JSON.parse(localStorage.getItem('user')).userId;
  


  const [userHistory, setUserHistory] = useState(() => {
    const savedHistory = localStorage.getItem(`userHistory_${userId}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  
 

  useEffect(() => {
  
    axios
      .get('http://localhost:8080/api/songs/getdetails')
      .then((response) => setSongs(response.data))
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  useEffect(() => {
    
    axios
      .get('http://localhost:8080/api/artist/getAllArtists')
      .then((response) => setArtists(response.data))
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  useEffect(()=>{
    axios
    .get('http://localhost:8080/api/playlists')
    .then((response) => setPlaylists(response.data))
    .catch((error) => console.error('Error fetching albums:', error));
  },[]
  );



  const handleUpdateSong = (song) => {
    updateSong(song); // Call the parent updateSong function
  
    
    setUserHistory((prevHistory) => {
      console.log('Current Song:', song);
      console.log('Previous History:', prevHistory);
  
      // Check if the song is already in history
      const isAlreadyInHistory = prevHistory.some((item) => item.songId === song.songId);
      
      if (!isAlreadyInHistory) {
        // Add the new song to the beginning of the history
        const updatedHistory = [song, ...prevHistory];
        console.log('Updated History:', updatedHistory);
  
        // Limit the history to the last 5 songs
        const limitedHistory = updatedHistory.slice(0, 5);
  
        // Save to localStorage
        localStorage.setItem(`userHistory_${userId}`, JSON.stringify(limitedHistory));

  
        return limitedHistory;
      }
  
      return prevHistory;
    });
  
   
  };

  const clearHistory = () => {

    localStorage.removeItem(`userHistory_${userId}`);
    setUserHistory([]);
  }
  
  

  return (
    <>
      <Navbar />
      <div className="home">
        {userHistory.length > 0 && (
          <div>
            <div className='recentlyPlayed'>
            <h3>Recently Played</h3>
            <h5 className='clearhistory' onClick={clearHistory}>clear history</h5>
            </div>
            <div className="albumItem">
              {userHistory.map((song, index) => (
                <SongItem
                  key={index}
                  SongName={song.songName}
                  artistName={song.artist}
                  image={song.imageUrl}
                  onClick={() => handleUpdateSong(song)}
                />
              ))}
            </div>
          </div>
        )}

        <h3>Featured Charts</h3>
        <div className="albumItem">
          {playlists.map((playlist, index) => (
            <AlbumItem key={index} title={playlist.title} desc={playlist.description} img={playlist.imageUrl} />
          ))}
        </div>

        <h3>Today's Top Hits</h3>
        <div className="albumItem">
          {songs.map((song, index) => (
            <SongItem
              key={index}
              SongName={song.songName}
              artistName={song.artist}
              image={song.imageUrl}
              onClick={() => handleUpdateSong(song)}
            />
          ))}
        </div>

        <h3>Favourite Artists</h3>
        <div className="albumItem">
          {artists.map((artist, index) => (
            <ArtistItem
              key={index}
              ArtistName={artist.artistName}
              artist="artist"
              image={artist.artistImage}
              artistId={artist.artistId}
            />
          ))}
        </div>

        <div className="space"></div>
        <Footer />
        <Link to="/upload"><button>register artist</button></Link>
        <Link to="/uploadSong"><button>upload song</button></Link>
        <div className="space"></div>
      </div>
    </>
  );
};

export default Home;
