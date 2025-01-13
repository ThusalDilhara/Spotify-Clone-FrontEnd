import React from 'react';
import '../styles/artistLogging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";

function artistLogging() {
    const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/artistDashboard");
  };
  return (
    <>
    <div className='artistbody'>
    <div className='artistLoggingPageImage'>
        <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
      </div>
      
      <div className='artistTitle'>Logging into Spotify</div>
      <br />
      <div className="artistLoggingContainer">
        <div className='itemSet01'>
          Email <br />
          <input
            type="text"
            className='artistInput'
            placeholder="Email"
            required
          />
        </div>
        
        <div className='itemSet01'>
          Password<br />
          <input
            type="password"
            className='artistInput'
            placeholder="Password"
            required
          />
        </div>
        <br /><br />
      <button onClick={handleNavigate} className='loggingButton'><b>Log In</b></button>
        
        <br />
        <b>Don't have an account?</b> <a href="/artistSigning"><u>Sign up for Spotify</u></a>
      </div>
    </div>
      
    </>
  );
}

export default artistLogging;
