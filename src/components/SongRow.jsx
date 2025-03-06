import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/ArtistPage.css"; 

const SongRow = ({ song, isLiked, onPlay, onLikeToggle }) => {
  return (
    <li className="Artistsongitem">
      <div className="Artistsonginfo">
        <img src={song.imageUrl} alt={song.songName} className="Artistsongimage" />
        <div className="Artistsongdetails">
          <p className="Artistsongname">{song.songName}</p>
          <p className="songartist">{song.artist}</p>
          <div className="Artistsongactions">
            <div className="play-btn-wrapper">
              <button className="play-btn" onClick={() => onPlay(song)}>
                <FaPlay className="play-icon" />
              </button>
              <span className="custom-tooltip">Play Song</span>
            </div>
            <div className="like-btn-wrapper">
              <button
                className="like-btn"
                onClick={() =>
                  onLikeToggle(song.songId, song.songName)
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
};

export default SongRow;
