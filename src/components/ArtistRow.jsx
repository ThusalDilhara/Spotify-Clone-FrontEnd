import React from "react";
import "../styles/FollowedArtistPage.css";

const ArtistRow = ({ artist, onViewProfile, onUnfollow }) => {
  return (
    <div className="artist-row">
      <img src={artist.artistImage} alt={artist.artistName} className="artist-row-image" />
      <div className="artist-row-info">
        <h4>{artist.artistName}</h4>
      </div>
      <div className="artist-row-buttons">
        <button className="view-profile-btn" onClick={() => onViewProfile(artist.artistId)}>
          View Profile
        </button>
        <button className="unfollow-btn" onClick={() => onUnfollow(artist.artistId,artist.artistName)}>
          Unfollow
        </button>
      </div>
    </div>
  );
};

export default ArtistRow;
