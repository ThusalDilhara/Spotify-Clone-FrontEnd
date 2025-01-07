import {React,useState,useEffect} from 'react';
import '../styles/Header.css';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaCrown, FaUser} from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Header = () => {

  const[isMenuOpen,setIsMenuOpen]=useState(false);
  
  const toggleMenu= ()=>{
    setIsMenuOpen((prev)=>!prev);

  }
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".header_profile")) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


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
      <div className="profile_icon_container" onClick={toggleMenu}>
        <FaUserCircle className="profile_icon" />
        <span className="profile_name">Profile</span>
      </div>
      {isMenuOpen && (
        <div className="profile_menu">
          <div className="menu_item">
            <FaUser className="menu_icon" />
            <span>My Profile</span>
          </div>
          <div className="menu_item">
            <FaCrown className="menu_icon" />
            <span>Explore Premium</span>
          </div>
          <div className="menu_item">
            <FaSignOutAlt className="menu_icon" />
            <span>Log Out</span>
          </div>
        </div>
      )}
    </div>
      
    </header>
  );
};

export default Header;
