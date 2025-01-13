import React from 'react';
import '../styles/artistLogging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function artistLogging() {
  return (
    <>
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
      
        <div className='loggingButton'><b>Log In</b></div>
        <br />
        <b>Don't have an account?</b> <u>Sign up for Spotify</u>
      </div>
    </>
  );
}

export default artistLogging;
