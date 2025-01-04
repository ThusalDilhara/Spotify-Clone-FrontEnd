import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import "../styles/ArtistPage.css";
import axios from "axios";
import { toast } from "react-toastify";

const ArtistPage = ({ updateSong }) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const userId = "6778c203c085eb28fe42fa69"; 

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
            .catch((error) => console.error("Error fetching song details:", error));
        }
      })
      .catch((error) => console.error("Error fetching artist data:", error));

    //get liked songs from the backend 
    axios
      .get(`http://localhost:8080/api/users/getlikedSongs/${userId}`)
      .then((response) => {
        setLikedSongs(response.data); 
      })
      .catch((error) => console.error("Error fetching liked songs:", error));

  }, [artistId, userId]);

  if (!artist) {
    return <p>Loading artist...</p>;
  }

  
  const handleLikedSong = ({ userId, songId, songName }) => {
    const isLiked = likedSongs.includes(songId);
    console.log("isLiked:", isLiked);  // Add a log to see the value of isLiked
    
    if (isLiked) {
      axios
        .delete(`http://localhost:8080/api/users/removeLikedSong/${userId}/${songId}`)
        .then((response) => {
          console.log("Song removed from liked songs:", response);
          setLikedSongs((prevLikedSongs) =>
            prevLikedSongs.filter((id) => id !== songId)
          );
          toast.success(`Removed ${songName} from liked songs`);
        })
        .catch((error) => {
          console.error("Error removing song from liked songs:", error);
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
        .catch((error) => {
          console.error("Error adding song to liked songs:", error);
          toast.error("Failed to add song to liked songs");
        });
    }
  };
  

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
        {songs.length === 0 ? (
          <p>No songs from this artist yet</p>
        ) : (
          <ul>
            {songs.map((song) => {
              const isLiked = likedSongs.includes(song.songId); // Check if song is liked
              return (
                <li key={song.songId} className="Artistsongitem">
                  <div className="Artistsonginfo">
                    <img
                      src={song.imageUrl}
                      alt={song.songName}
                      className="Artistsongimage"
                    />
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
                            onClick={() =>
                              handleLikedSong({
                                userId,
                                songId: song.songId,
                                songName: song.songName,
                              })
                            }
                          >
                            {isLiked ? (
                              <FaHeart className="like-icon liked" />
                            ) : (
                              <FaRegHeart className="like-icon" />
                            )}
                            <span className="custom-tooltip">
                              {isLiked ? "Liked" : "Add to Liked Songs"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="space"></div>
    </div>
  );
};

export default ArtistPage;
