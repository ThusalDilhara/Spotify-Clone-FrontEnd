import React, { useState } from "react";
import '../styles/artistDashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import backgroundImage from '../assets/Yuki.jpeg';
import songProfileIcon from '../assets/image-1.jpeg';

function artistSigning() {

  const [isReleaseSongOpen, setIsReleaseSongOpen] = useState(false);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);

  const openReleaseSong = () => {
    setIsReleaseSongOpen(true);
  };
  const openAddAlbum= () => {
    setIsAddAlbumOpen(true);
  };

  const closeReleaseSong = () => {
    setIsReleaseSongOpen(false);
  };
  const closeAddAlbum = () => {
    setIsAddAlbumOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "popupOverlay") {
      closeReleaseSong();
      closeAddAlbum();
    }
  };

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
        <button onClick={openReleaseSong} className='artistButton'><b>Release A Song</b></button>
        <button onClick={openAddAlbum} className='artistButton'><b>Add A Album</b></button>
      </div>
      
      <div style={{position: "absolute", borderRight: "2px solid white",top:"40%", height: "70%", left: "30%" }}></div>
    
      <div className='artistDashBoardRightSide'>

        <div style={{display:"block"}}>
        <div className='artistName'>Yuki <br />Navarathne</div>
        <span style={{display:"flex", color:"black"}}>
        <button className='artistSmallButton'><b>Song</b></button>
        <div style={{ marginRight: "20px" }}></div>
        <button className='artistSmallButton'><b>Album</b></button>
        </span>
        </div>
        <div style={{ marginRight: "100px" }}></div>

        
        <div className='artistDetails'> 
        <FontAwesomeIcon icon={faStar} className='star' style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} className='star' style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} className='star' style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} className='star' style={{ color: "gold", fontSize: "24px",marginRight:"10px"}} />
        <FontAwesomeIcon icon={faStar} className='star' style={{ color: "white", fontSize: "24px",marginRight:"10px"}} />

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
        <div className='songListArea'>
          <div className='songCard'>
            <b>01</b>
            <div style={{ marginRight: "20px" }}></div>
            <div className='songProfileIcon' style={{ backgroundImage: `url(${songProfileIcon})` }}></div>
            <div style={{ marginRight: "20px" }}></div>
            <div className='songDetails'>
              <div className='songName'>Pini Bidu</div>
              Yuki Navarathne | 2024 January Released
              </div>
              <div style={{ marginRight: "20%" }}></div>
              <div className='songDetails'>
              <div className='songName'>
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "white", fontSize: "15px",marginRight:"10px"}} />
              </div>
              234K Views
              </div>
              <div style={{ marginRight: "20%" }}></div>
              <div className='songDetails'>
              <div className='songName'><b>...</b></div>
              </div>

          </div>

          <div className='songCard'>
            <b>01</b>
            <div style={{ marginRight: "20px" }}></div>
            <div className='songProfileIcon' style={{ backgroundImage: `url(${songProfileIcon})` }}></div>
            <div style={{ marginRight: "20px" }}></div>
            <div className='songDetails'>
              <div className='songName'>Pini Bidu</div>
              Yuki Navarathne | 2024 January Released
              </div>
              <div style={{ marginRight: "20%" }}></div>
              <div className='songDetails'>
              <div className='songName'>
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "gold", fontSize: "15px",marginRight:"10px"}} />
              <FontAwesomeIcon icon={faStar} style={{ color: "white", fontSize: "15px",marginRight:"10px"}} />
              </div>
              234K Views
              </div>
              <div style={{ marginRight: "20%" }}></div>
              <div className='songDetails'>
              <div className='songName'><b>...</b></div>
              </div>

          </div>

        </div>
        
      </div>
      

      {/* Release Song */}
      {isReleaseSongOpen && (
              <div 
                className="popupOverlay" 
                onClick={handleOutsideClick}
              >
                <div className="releaseSong">
                  
                  <h2><u >Release A Song</u></h2>
                  <div style={{display:"flex"}}>
                    <div className='addImageArea'>
                            <FontAwesomeIcon icon={faImage} size='4x'/>
                            <br />
                            + Add Image
                            </div>
                            <div style={{ marginRight: "40px" }}></div>
                            <div className="inputArea">
                            <table style={{textAlign:"left", width:"100%"}}>
                              <tbody>
                                <tr>
                                  <td style={{ width: "30%" }}>Song Name </td>
                                  <td style={{ width: "80%" }}>: <input type="text" /></td>
                                </tr>
                                <tr>
                                  <td>Artist Name</td>
                                  <td>: <input type="text" /></td>
                                </tr>
                                <tr>
                                  <td>Album</td>
                                  <td>: <select name="" id="">
                                                  <option value="selected">Album 01</option>
                                                  <option value="">Album 02</option>
                                                </select></td>
                                </tr>
                                <tr>
                                  <td>Duration</td>
                                  <td>: <input type="time" /></td>
                                </tr>
                              </tbody>
                            </table>
                            

                            </div>
                  </div>
                  <div style={{display:"flex", marginTop:"50px"}}>
                  
                  <button onClick={closeReleaseSong} className='artistSmallButton'><b>Cancel</b></button>
                  <div style={{ marginRight: "40%" }}></div>
                  <button className='artistButton'><b>Release</b></button> 
                  </div>
                  
                </div>
              </div>
            )}

      {/* Add A Album */}
      {isAddAlbumOpen && (
        <div 
          className="popupOverlay" 
          onClick={handleOutsideClick}
        >
          <div className="releaseSong">
            
            <h2><u >Add A Album</u></h2>
            <div style={{display:"flex"}}>
              <div className='addImageArea'>
                      <FontAwesomeIcon icon={faImage} size='4x'/>
                      <br />
                      + Add Image
                      </div>
                      <div style={{ marginRight: "40px" }}></div>
                      <div className="inputArea">
                      <table style={{textAlign:"left", width:"100%"}}>
                        <tbody>
                          <tr>
                            <td style={{ width: "30%" }}>Album Name </td>
                            <td style={{ width: "80%" }}>: <input type="text" /></td>
                          </tr>
                          <tr>
                            <td>Discription</td>
                            <td>: <input type="text" /></td>
                          </tr>
                        </tbody>
                      </table>
                      

                      </div>
            </div>
            <div style={{display:"flex", marginTop:"50px"}}>
            
            <button onClick={closeAddAlbum} className='artistSmallButton'><b>Cancel</b></button>
            <div style={{ marginRight: "40%" }}></div>
            <button className='artistButton'><b>Create</b></button> 
            </div>
            
          </div>
        </div>
      )}
      
    </>
  );
}

export default artistSigning;
