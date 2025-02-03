import React from 'react';
import '../styles/artistLogging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function artistSigning() {
  return (
    <>
    <div className='artistbody'>
    <div className='artistLoggingPageImage'>
        <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
      </div>
      
      <div className='artistTitle'>Signing into Spotify <br /> as Artist</div>


      
      <br />
      <div className="artistLoggingContainer">

      <h3>Profile Image</h3>

        <div className='addImageArea'>
        <FontAwesomeIcon icon={faImage} size='4x'/>
        <br />
        + Add Image
        </div>

        
      <div className='itemSet01'>
          User Name <br />
          <input
            type="text"
            className='artistInput'
            placeholder="Name"
            required
          />
        </div>

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
        <div className='itemSet01'>
          Confirm Password<br />
          <input
            type="password"
            className='artistInput'
            placeholder="Password"
            required
          />
        </div>


        <br /><br />
      
        <button className='loggingButton' ><b>Sign In</b></button>
        <br />
        <b>Have an account?</b> <a href="/artistLogging"><u>Log In for Spotify</u></a>
      </div>
    </div>
      
    </>
  );
}

export default artistSigning;
