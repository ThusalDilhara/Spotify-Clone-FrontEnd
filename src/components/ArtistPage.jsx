import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Home.css";
import "../styles/ArtistPage.css";

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]); 

  useEffect(() => {
    
    fetch(`http://localhost:8080/api/artist/getArtistDetails/${artistId}`)
      .then((response) => response.json())
      .then((data) => {
        setArtist(data);

        
        if (data.songIds && data.songIds.length > 0) {
          fetch('http://localhost:8080/api/songs/getSongsByIds', {
            method: 'POST',  
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.songIds), 
          })
            .then((response) => response.json())
            .then((songData) => setSongs(songData))
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
        <h3>Songs</h3>
        <ul>
          {songs.map((song) => (
            <li key={song.songId}>
              <div className="song-item">
                <p>{song.songName}</p>
                <button
                  className="play-btn"
                  onClick={() => console.log(`Playing ${song.songName}`)}
                >
                  Play
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistPage;
