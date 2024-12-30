import React from 'react';
import '../styles/Sidebar.css';
import SidebarItem from './sideBarItem';
import { VscLibrary } from "react-icons/vsc";
import likedSong from '../assets/liked_Song.jpg';
import likedPlaylist from '../assets/liked_playlist.webp';
import followedArtist from '../assets/followed_artist.webp';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
      <VscLibrary className="library_icon" />
      <h3 className="sidebar_title">Your Library</h3>
      </div>

      <SidebarItem img={likedSong} text="Liked Songs" />
      <SidebarItem img={likedPlaylist} text="Liked Playlist" />
      <SidebarItem img={followedArtist} text="followed artist" />
      
    </div>
  );
};

export default Sidebar;
