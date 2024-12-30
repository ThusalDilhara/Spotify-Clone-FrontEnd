import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaRandom } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { TbRepeat } from "react-icons/tb";
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BsArrowsFullscreen, BsThreeDots } from "react-icons/bs";
import { HiOutlineQueueList } from "react-icons/hi2";
import "../styles/musicPlayer.css";
import song1 from "../assets/main/image-5.jpg";
import song2 from "../assets/main/image-11.jpg";
import song3 from "../assets/main/image-17.jpg";

const songs = [
  {
    title: "Viramayak",
    artist: "Bhashi Devanga",
    file: "/songs/viramayak.mp3",
    image: song1,
  },
  {
    title: "Kawiya",
    artist: "Vidula Ravishara",
    file: "/songs/kawiya.mp3",
    image: song2,
  },
  {
    title: "Nohithunata",
    artist: "Yuki Nawarathna",
    file: "/songs/nohithunata.mp3",
    image: song3,
  },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentTime, setCurrentTime] = useState(0); //state for current time of the song
  const [duration, setDuration] = useState(0); //state for duration of the song

  const audioRef = useRef(new Audio(songs[0].file));

  const currentSong = songs[currentIndex];

  
  useEffect(() => { //runs when the current index changes
    audioRef.current.src = currentSong.file;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play();
    }
    setCurrentTime(0);

    const handleSongEnd = () => {
      playNextSong();
    };
  
    audioRef.current.addEventListener("ended", handleSongEnd);

    return () => {
      audioRef.current.removeEventListener("ended", handleSongEnd);
    };
  }, [currentIndex, isPlaying]);


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
      setDuration(audioRef.current.duration || 0);
    };

    audioRef.current.addEventListener("timeupdate", updateProgress); //time updates it fires
    audioRef.current.addEventListener("loadedmetadata", updateProgress); //updates when duration change

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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
    }
    setIsPlaying(true);
  };

 
  const playPreviousSong = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  
  const playRandomSong = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentIndex);
    setCurrentIndex(randomIndex);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
   
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;//2:05
  };

  return (
    <div className="music-player">
    
      <div className="song-info">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="song-image"
        />
        <div className="song-details">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>

    
      <div className="controls">
        <div className="player-controls">
          <FaRandom
            className={`icon_shuffle ${isShuffle ? "active" : ""}`}
            onClick={toggleShuffle}
          />
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
