import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import Navbar from './navbar';
import AlbumItem from './AlbumItem';
import image1 from '../assets/image-1.jpeg';
import image2 from '../assets/image-2.jpg';
import image3 from '../assets/image-3.jpg';
import image4 from '../assets/image-4.jpg';
import image5 from '../assets/image-5.jpg';
import image6 from '../assets/image-6.jpg';
import SongItem from './SongItem';
import ArtistItem from './artistItem';
import { Footer } from './Footer';

const albums = [
  { image: image1, title: 'Album 1', desc: 'This is the description for Album 1.' },
  { image: image2, title: 'Album 2', desc: 'This is the description for Album 2.' },
  { image: image3, title: 'Album 3', desc: 'This is the description for Album 3.' },
  { image: image4, title: 'Album 4', desc: 'This is the description for Album 4.' },
  { image: image5, title: 'Album 5', desc: 'This is the description for Album 5.' },
  { image: image6, title: 'Album 6', desc: 'This is the description for Album 6.' },
];

const Home = ({ updateSong }) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const userId = "6778c203c085eb28fe42fa69";
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



  const handleUpdateSong = (song) => {
    updateSong(song); // Call the parent updateSong function
  
    // Update user history
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
          {albums.map((album, index) => (
            <AlbumItem key={index} title={album.title} desc={album.desc} img={album.image} />
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
        <div className="space"></div>
      </div>
    </>
  );
};

export default Home;
