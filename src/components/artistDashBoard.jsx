import React, { useState,useEffect } from "react";
import '../styles/artistDashBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SongRow from "./songCardOnArtist";  


//import backgroundImage from '../assets/Yuki.jpeg';
import songProfileIcon from '../assets/image-1.jpeg';

function artistSigning() {

  const artist = JSON.parse(localStorage.getItem("artist"));
  const backgroundImage = `${artist.artistImage}`;
  const artistEmail = `${artist.email}`;
  const artistID = `${artist.artistId}`;
  const songsCount = artist?.SongsIds?.length || 0;


  const navigate = useNavigate();

  const [isReleaseSongOpen, setIsReleaseSongOpen] = useState(false);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const [isArtistProfileOpen, setIsOpenArtistProfile] = useState(false);
  const [newName, setArtistNewName] = useState("");
  const [newPassword, setArtistNewPassword] = useState("");
  const [oldPassword, setArtistOldPassword] = useState("");

  //handle song
  const [songName, setSongName] = useState("");
  const artistName = `${artist.artistName}`;
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);


  //handle Release song UI
  const openReleaseSong = () => {
    setIsReleaseSongOpen(true);
  };
  const closeReleaseSong = () => {
    setIsReleaseSongOpen(false);
  };

   //handle Artist Profile UI
   const openArtistProfile = () => {
    setIsOpenArtistProfile(true);
  };
  const closeArtistProfile = () => {
    setIsOpenArtistProfile(false);
  };


  //handle relase song
  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSongUpload = async () => {
    console.log("Came to the handle Song Upload method ");
    if (!songName || !artistName || !artistID || !imageFile || !audioFile) {
      alert("Please fill all fields and select both image and audio files.");
      return;
    }

    setLoading(true);

    try {
    
      const imageFormData = new FormData();
      imageFormData.append("file", imageFile);
      imageFormData.append("upload_preset", "spotifyClone");
      console.log("Came to try method ");

      const imageResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxwvh1aal/image/upload",
        imageFormData
      );
      console.log("waiting Uploaded the image ");
      const ImageUrl = imageResponse.data.secure_url;
      console.log("Uploaded the image ");

     
      const audioFormData = new FormData();
      audioFormData.append("file", audioFile);
      audioFormData.append("upload_preset", "spotifyClone");
      console.log("Came to upload audio file ");

      const audioResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxwvh1aal/video/upload",
        audioFormData
      );
      const audioUrl = audioResponse.data.secure_url;

    
      const songData = {
        songName:songName,
        artist:artistName,
        url: audioUrl,
        ImageUrl:ImageUrl,
        artistId:artistID,
      };

      const backendResponse = await axios.post(
        "http://localhost:8080/api/songs/saveSong", 
        songData
      );

      //alert("Song Uploaded Successfully!");
      closeReleaseSong();
      showToast("Released Song Successfully..!", "green", "white");
      console.log("Backend Response:", backendResponse.data);

     
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


 //handle Add Album UI
  const openAddAlbum= () => {
    setIsAddAlbumOpen(true);
  };
  const closeAddAlbum = () => {
    setIsAddAlbumOpen(false);
  };

  //handle click outside 
  const handleOutsideClick = (e) => {
    if (e.target.className === "popupOverlay") {
      closeReleaseSong();
      closeAddAlbum();
      closeArtistProfile();
    }
  };

  const goToLoggingPage = () => {
    navigate("/artistLogging");
  };


  //handle the delete artist
  const deleteArtist = async (e) => {
      e.preventDefault();
      try {
        const responseOfArtistLogging = await fetch("http://localhost:8080/api/artist/deleteArtist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email: artist.email,
           }),
        });
    
        if (!responseOfArtistLogging.ok) {
          toast.success('Some Error..!', {
            icon: <FaSpotify size={40} color="white" />,
            autoClose: 5000, 
            style: {
              background: "red",
              color: "white", 
              fontSize: "16px", 
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
            },
            progressStyle: { background: "white" },
          });
          return;
        }
        showToast("Delete Artist Successfully..!", "green", "white");
        goToLoggingPage();        
    
      } catch (error) {
        console.error("Login failed:", error);
        toast.success('Some Error..!', {
          icon: <FaSpotify size={40} color="white" />,
          autoClose: 5000, 
          style: {
            background: "red",
            color: "white", 
            fontSize: "16px", 
            fontWeight: "bold",
            padding: "12px 20px",
            borderRadius: "8px",
          },
          progressStyle: { background: "white" },
        });
      }
    };

//display tost msg
    const showToast = (message, backgroundColor, progressColor) => {
      toast.success(message, {
        icon: <FaSpotify size={40} color="white" />,
        autoClose: 5000,
        style: {
          background: backgroundColor,
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "12px 20px",
          borderRadius: "8px",
          "--toastify-color-progress-success": progressColor,
        },
      });
    };

    //handle the delete artist
  const updateArtist = async (e) => {
    e.preventDefault();
    if(artist.password===oldPassword){
      try {
            const responseOfArtistLogging = await fetch("http://localhost:8080/api/artist/updateArtist", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                artistName:newName,
                email:artistEmail,
                password: newPassword, }),
            });
            if (!responseOfArtistLogging.ok) {
              showToast("Backend Error..!, No response", "red", "white");
              return;
            }
        
            const artist = await responseOfArtistLogging.json();
            localStorage.setItem("artist", JSON.stringify(artist));
            navigate("/artistDashboard");
            setArtistNewName();
            setArtistOldPassword();
            setArtistNewPassword();
            closeArtistProfile();
            showToast("Details Updated..!", "green", "white");
        
          } catch (error) {
            showToast("Backend Error..!", "red", "white");
          }
      
    }else{
      showToast("Password Incorrect..!", "red", "white");
    }
    
  };


  //get songs
  useEffect(() => {
  console.log("come to the useEffect method");
  console.log(`songCount is ${songs.length}`);

    axios
        
          console.log("come to the get song ");

          axios
            .post("http://localhost:8080/api/songs/getSongsByIds", artist.songIds, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((songResponse) => setSongs(songResponse.data))
            .catch((error) => console.error("Error fetching song details:", error));
        

  }, []);

  return (
    <>
    

      <div className='headerbody'>
      <div className='spotifyIcon'>
        <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
      </div>
      <h2>Welcome into the Artist DashBoard..!</h2>
      <FontAwesomeIcon icon={faBell} size='2x' className='headerIcon2' />
      <FontAwesomeIcon onClick={openArtistProfile} icon={faUserCircle} size="3x" className='headerIcon1' style={{ color: "#ffffff" }} />
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
        <div className='artistName'> {artist.artistName} <br /></div>
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
            <div className='item01'> {songs.length}
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
          {songs.length === 0 ? (
          <p>No songs from this artist yet</p>
        ) : (
          <ul>
            {songs.map((song) => (
              <SongRow
                key={song.songId}
                song={song}
               
              />
            ))}
          </ul>
        )}

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
                            <input type="file" accept="image/*" onChange={handleImageChange} required />
                            + Add Image
                            </div>
                            <div style={{ marginRight: "40px" }}></div>
                            <div className="inputArea">
                            <table style={{textAlign:"left", width:"100%"}}>
                              <tbody>
                                <tr>
                                  <td style={{ width: "30%" }}>Song Name </td>
                                  <td style={{ width: "80%" }}>: <input 
                                  type="text"
                                  placeholder="Song Name"
                                  value={songName}
                                  onChange={(e) => setSongName(e.target.value)}
                                  required /></td>
                                </tr>
                                <tr>
                                  <td>Artist Name</td>
                                  <td>: <input type="text" value={artist.artistName} /></td>
                                </tr>
                                <tr>
                                  <td>Audio File</td>
                                  <td>: <input type="file" accept="audio/*" onChange={handleAudioChange} required /></td>
                                </tr>
                              </tbody>
                            </table>
                            

                            </div>
                  </div>
                  <div style={{display:"flex", marginTop:"50px"}}>
                  
                  <button onClick={closeReleaseSong} className='artistSmallButton'><b>Cancel</b></button>
                  <div style={{ marginRight: "40%" }}></div>
                  <button  onClick={handleSongUpload} disabled={loading} className='artistButton'><b>Release</b></button> 
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

      {/* Artist Profile */}
      {isArtistProfileOpen && (
        <div 
          className="popupOverlay" 
          onClick={handleOutsideClick}
        >
          <div className="releaseSong">
            
            <h2><u >Artist Profile</u></h2>
            <div style={{display:"flex"}}>
            <div className='artistProfileImage'  style={{ backgroundImage: `url(${backgroundImage})` }}> </div>
                      <div style={{ marginRight: "40px" }}></div>
                      <div className="inputArea">
                      <table style={{textAlign:"left", width:"100%"}}>
                        <tbody>
                          <tr>
                            <td style={{ width: "30%" }}>Name </td>
                            <td style={{ width: "80%" }}>: <input value={newName} 
                             onChange={(e) => setArtistNewName(e.target.value)}
                             placeholder={artist.artistName} type="text" /></td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>: <input disabled={true} value={artist.email} type="text" /></td>
                          </tr>
                          <tr>
                            <td>Password</td>
                            <td>: <input value={oldPassword} placeholder="Enter Old password" 
                             onChange={(e) => setArtistOldPassword(e.target.value)}
                             type="text" /></td>
                          </tr>
                          <tr>
                            <td>New Password</td>
                            <td>: <input value={newPassword} 
                             onChange={(e) => setArtistNewPassword(e.target.value)}
                             placeholder="Enter New password If needed" type="text" /></td>
                          </tr>
                        </tbody>
                      </table>
                      

                      </div>
            </div>
            <div style={{display:"flex", marginTop:"50px"}}>
            
            <button onClick={goToLoggingPage} className='artistSmallButton'><b>Sign Out</b></button>
            <div style={{ marginRight: "5%" }}></div>
            <button onClick={deleteArtist} className='artistSmallButtonRed'><b>Delete Account</b></button>
            <div style={{ marginRight: "5%" }}></div>
            <button onClick={updateArtist} className='artistSmallButton'><b>Update</b></button>
            <div style={{ marginRight: "5%" }}></div>
            <button onClick={closeArtistProfile} className='artistButton'><b>OK</b></button> 
            </div>
            
          </div>
        </div>
      )}
      
    </>
  );
}

export default artistSigning;
