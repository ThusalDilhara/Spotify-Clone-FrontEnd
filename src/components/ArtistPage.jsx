import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/Home.css'
import '../styles/ArtistPage.css'


const ArtistPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    
    fetch(`http://localhost:8080/api/artist/getArtistDetails/${artistId}`)
      .then((response) => response.json())
      .then((data) => setArtist(data))
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
     
      {/* <div className="artist-songs">
        <h3>Songs</h3>
        {artist.songs.map((song, index) => (
          <div key={index} className="song-item">
            <h5>{song.songName}</h5>
            <p>{song.album}</p>
          </div>
        ))}
      </div> */}
    </div>
    
    
  );
};

export default ArtistPage;
