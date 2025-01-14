import React from 'react';
import '../styles/Sidebar.css';
import SidebarItem from './sideBarItem';
import { VscLibrary } from "react-icons/vsc";
import likedSong from '../assets/liked_Song.jpg';
import likedPlaylist from '../assets/liked_playlist.webp';
import followedArtist from '../assets/followed_artist.webp';
import { Link } from "react-router-dom";



const Sidebar = () => {


  return (
    <div className="sidebar">
      <div className="sidebar_header">
      <VscLibrary className="library_icon" />
      <h3 className="sidebar_title">Your Library</h3>
      </div>

      <Link to="/likedSong">
       
        <SidebarItem img={likedSong} text="Liked Songs" />
        
      </Link>
      <SidebarItem img={likedPlaylist} text="Liked Playlist" />

      <Link to="/followedArtist">
      <SidebarItem img={followedArtist} text="followed artist" />
      </Link>
      
    </div>
  );
};

export default Sidebar;
