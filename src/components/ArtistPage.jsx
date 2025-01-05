import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SongRow from "./SongRow";  
import "../styles/ArtistPage.css";

const ArtistPage = ({ updateSong }) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const userId = "6778c203c085eb28fe42fa69"; 

  const playSong = (song) => {
    if (updateSong) {
      updateSong(song);
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

    axios
      .get(`http://localhost:8080/api/users/getlikedSongs/${userId}`)
      .then((response) => {
        setLikedSongs(response.data);
      })
      .catch((error) => console.error("Error fetching liked songs:", error));
  }, [artistId, userId]);

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
        {songs.length === 0 ? (
          <p>No songs from this artist yet</p>
        ) : (
          <ul>
            {songs.map((song) => (
              <SongRow
                key={song.songId}
                song={song}
                isLiked={likedSongs.includes(song.songId)}
                onPlay={playSong}
                onLikeToggle={handleLikedSong}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="space"></div>
    </div>
  );
};

export default ArtistPage;
