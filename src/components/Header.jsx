import React from 'react';
import '../styles/Header.css';
import { FaSearch, FaUserCircle} from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header_logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify Logo"
        />
      </div>
      <Link to="/home">
      <div className="header_home">
        <GoHomeFill className="home_icon" />
        
      </div>
      </Link>
      

      <div className="header_search">
        <FaSearch className="search_icon" />
        <input
          type="text"
          placeholder="What do you want to Play?"
          className="search_input"
        />
      </div>
      <button className='header_premium'> Explore Premium</button>


  
     

      <div className="header_profile">
        <FaUserCircle className="profile_icon" />
        <span className="profile_name">Profile</span>
      </div>
    </header>
  );
};

export default Header;
