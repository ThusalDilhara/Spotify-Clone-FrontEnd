import React from 'react';
import '../styles/artistDashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import backgroundImage from '../assets/Yuki.jpeg';

function artistSigning() {
  return (
    <>
    

      <div className='headerbody'>
      <div className='spotifyIcon'>
        <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
      </div>
      <h2>Welcome into the Artist DashBoard..!</h2>
      <FontAwesomeIcon icon={faBell} size='2x' className='headerIcon2' />
      <FontAwesomeIcon icon={faUserCircle} size="3x" className='headerIcon1' style={{ color: "#ffffff" }} />
      </div>

      <div className='artistDashBoardLeftSide'>
        <div className='artistProfileImage'  style={{ backgroundImage: `url(${backgroundImage})` }}> </div>
        <br /><br />
        <div className='artistButton'><b>Release A Song</b></div>
        <div className='artistButton'><b>Add A Album</b></div>
      </div>
      
      <div style={{position: "absolute", borderRight: "2px solid white",top:"40%", height: "70%", left: "30%" }}></div>
    
      <div className='artistDashBoardRightSide'>

        <div className='artistName'>Yuki <br />Navarathne
        <div style={{display:"flex"}}>
        <div className='artistSmallButton'><b>Song</b></div>
        <div style={{ marginRight: "20px" }}></div>
        <div className='artistSmallButton'><b>Album</b></div>
        </div>
        
        </div>

        <div className='artistDetails'> 
        <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} style={{ color: "white", fontSize: "24px",marginRight:"10px"}} />

        <div className='details'>
            <div className='item01'>54
            <br /><div style={{fontSize:"20px"}}>Songs</div>
            </div>

            <div className='item01'>12
            <br /><div style={{fontSize:"20px"}}>Albums</div>
            </div>

            <div className='item01'>23K
            <br /><div style={{fontSize:"20px"}}>Followers</div>
            </div>
            
        </div>
        

        </div><br />
        <div className='songCard'>test</div>
        
      </div>
      

      
    </>
  );
}

export default artistSigning;
