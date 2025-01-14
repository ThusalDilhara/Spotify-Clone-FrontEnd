import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaRandom } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { TbRepeat } from "react-icons/tb";
import { BsVolumeMute, BsVolumeUp, BsArrowsFullscreen, BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiOutlineQueueList } from "react-icons/hi2";

import "../styles/musicPlayer.css";

const MusicPlayer = ({ updateSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // Current time of the song
  const [duration, setDuration] = useState(0); // Total duration of the song

  const audioRef = useRef(new Audio());

  // Callback to allow updates from parent or sibling components
  updateSong((newSong) => {
    if (newSong) {
      setCurrentSong(newSong);
      audioRef.current.src = newSong.url; // Update audio source
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTime(0);
    }
  });

  useEffect(() => {
    const handleSongEnd = () => playNextSong();
    audioRef.current.addEventListener("ended", handleSongEnd);

    return () => audioRef.current.removeEventListener("ended", handleSongEnd);
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const updateProgress = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);  //duration is a inbuilt property of audioRef
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const volumeChange = () => {
    audioRef.current.muted = !isMute;
    setIsMute(!isMute);
  };

  const playNextSong = () => {
    if (isShuffle) {
      playRandomSong();
    } else {
      console.log("Handle next song logic from parent or sibling.");
    }
    setIsPlaying(true);
  };

  const playRandomSong = () => {
    console.log("Handle random song logic from parent or sibling.");
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="music-player">
      <div className="song-info">
        {currentSong ? (
          <>
            <img
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className="song-image"
            />
            <div className="song-details">
              <h3>{currentSong.songName}</h3>
              <p>{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <p>Select a song to play</p>
        )}
      </div>

      <div className="controls">
        <div className="player-controls">
          <FaRandom
            className={`icon_shuffle ${isShuffle ? "active" : ""}`}
            onClick={toggleShuffle}
          />
          <MdSkipPrevious className="icon" onClick={() => console.log("Previous song")} />
          <div onClick={togglePlayPause} className="play-pause">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
          <MdSkipNext className="icon" onClick={playNextSong} />
          <TbRepeat className="icon_shuffle" />
        </div>

        <div className="progress-bar">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSliderChange}
            className="slider"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="media-icons">
        <div onClick={volumeChange}>
          {isMute ? <BsVolumeMute className="icon" /> : <BsVolumeUp className="icon" />}
        </div>
        <HiOutlineQueueList className="icon" />
        <FiSettings className="icon" />
        <BsArrowsFullscreen className="icon" />
        <BsThreeDots className="icon" />
      </div>
    </div>
  );
};

export default MusicPlayer;
