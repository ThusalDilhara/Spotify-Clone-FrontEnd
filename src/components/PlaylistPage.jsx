import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SongRow from "./SongRow";  
import "../styles/PlaylistPage.css";
import { Footer } from './Footer';

const PlaylistPage = ({ updateSong }) => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user')).userId;

  const playSong = (song) => {
    if (updateSong) {
      updateSong(song);
    }
  };

  useEffect(() => {
   
    axios
      .get(`http://localhost:8080/api/playlists/getplaylist/${playlistId}`)
      .then((response) => {
        setPlaylist(response.data);

        if (response.data.songIDs && response.data.songIDs.length > 0) {
          axios
            .post("http://localhost:8080/api/songs/getSongsByIds", response.data.songIDs, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((songResponse) => setSongs(songResponse.data))
            .catch((error) => console.error("Error fetching song details:", error));
        }
      })
      .catch((error) => console.error("Error fetching playlist data:", error));

    // Fetch user's liked songs
    axios
      .get(`http://localhost:8080/api/users/getlikedSongs/${userId}`)
      .then((response) => {
        setLikedSongs(response.data);
      })
      .catch((error) => console.error("Error fetching liked songs:", error));
  }, [playlistId, userId]);

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

  if (!playlist) {
    return <p>Loading playlist...</p>;
  }

  return (
    <div className="playlist">
      <div className="playlist-info">
        
        <img src={playlist.imageUrl} alt={playlist.title} />
        <div className="playlist-stats">
          <p>Playlist</p>
          <h2>{playlist.title}</h2>
          <h4>{playlist.description}</h4>
          <h3>{songs.length} songs</h3>
        </div>
      </div>

      <div className="playlist-songs">
        <h3>Songs in this playlist</h3>
        {songs.length === 0 ? (
          <p>No songs in this playlist yet</p>
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
        <div className="space"></div>
        <Footer />
      </div>

      <div className="space"></div>
    </div>
  );
};

export default PlaylistPage;
