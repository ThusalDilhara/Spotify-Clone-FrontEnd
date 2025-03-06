import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaRandom } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { TbRepeat } from "react-icons/tb";
import { BsVolumeMute, BsVolumeUp, BsArrowsFullscreen, BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiOutlineQueueList } from "react-icons/hi2";

import "../styles/musicPlayer.css";

const MusicPlayer = ({ updateSong, songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  //  Update song when a new song is selected from the parent component
  useEffect(() => {
    updateSong((newSong) => {
      if (newSong) {
        const index = songs.findIndex((song) => song._id === newSong._id);
        if (index !== -1) setCurrentIndex(index);
        playSong(newSong);
      }
    });
  }, [songs]);

  //  Function to play a song
  const playSong = (song) => {
    setCurrentSong(song);
    audioRef.current.src = song.url;
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
    setCurrentTime(0);
  };

  //  Handle song end: play next song or repeat
  useEffect(() => {
    const handleSongEnd = () => playNextSong();
    audioRef.current.addEventListener("ended", handleSongEnd);
    return () => audioRef.current.removeEventListener("ended", handleSongEnd);
  }, [currentIndex, isShuffle]);

  //  Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Track progress of the song
  useEffect(() => {
    const updateProgress = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  //  Handle progress bar change
  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  //  Toggle mute
  const volumeChange = () => {
    audioRef.current.muted = !isMute;
    setIsMute(!isMute);
  };

  //  Play the next song
  const playNextSong = () => {
    if (songs.length === 0) return;

    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }

    setCurrentIndex(nextIndex);
    playSong(songs[nextIndex]);
  };

  // Play the previous song
  const playPreviousSong = () => {
    if (songs.length === 0) return;

    let prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    playSong(songs[prevIndex]);
  };

  // Toggle shuffle
  const toggleShuffle = () => setIsShuffle(!isShuffle);

  // Format time for display
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
            <img src={currentSong.imageUrl} alt={currentSong.title} className="song-image" />
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
          <FaRandom className={`icon_shuffle ${isShuffle ? "active" : ""}`} onClick={toggleShuffle} />
          <MdSkipPrevious className="icon" onClick={playPreviousSong} />
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
