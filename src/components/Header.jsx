import {React,useState,useEffect} from 'react';
import '../styles/Header.css';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaCrown, FaUser} from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from 'axios';

const Header = () => {

  const[isMenuOpen,setIsMenuOpen]=useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/search/suggestions?query=${value}`
        );
        console.log(response.data);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id, type) => {
    console.log(`Navigate to ${type} page with ID: ${id}`);
    // You can add navigation logic here, like using react-router's `useNavigate()`.
  };
  
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
          value={query}
          onChange={handleInputChange}
        />
       {suggestions.length > 0 && (
        <div className="search_suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="suggestion_item"
              onClick={() =>
                handleSuggestionClick(suggestion.id, suggestion.type)
              }
            >
              <span className="suggestion_name">{suggestion.name}</span>
              <span className="suggestion_type">{suggestion.type}</span>
            </div>
          ))}
        </div>
      )}
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
            <Link to="/profile">
              <span>My Profile</span>
            </Link>
          </div>
          <div className="menu_item">
            <FaCrown className="menu_icon" />
            <span>Upgrade to Premium</span>
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
