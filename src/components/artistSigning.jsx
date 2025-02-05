import React, { useState, useCallback} from "react";
import '../styles/artistLogging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpotify } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

function artistSigning() {
  const navigate = useNavigate(); 
  //varibles for save artist details from form
  const [artistName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [artistImage, setArtistImage] = useState("");

  const handleArtistSigning = async (e) => {
    e.preventDefault();
  
    console.log("Sending request with:", { artistName, email });
  
    try {
      const responseOfArtistLogging = await fetch("http://localhost:8080/api/artist/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          artistName:artistName,
          email: email,
          password: password,
          artistImage:imageURL,

         }),
      });
  
      if (!responseOfArtistLogging.ok) {
        const errorData = await responseOfArtistLogging.json().catch(() => null);
        setLoginError(errorData?.message || "Invalid credentials");
        return;
      }
      navigate("/artistLogging");
        toast.success("Artist Signup successfully..!", {
          icon: <FaSpotify size={40} color="white" />,
          autoClose: 5000, 
          style: {
            background: "#1DB954",
            color: "white", 
            fontSize: "16px", 
            fontWeight: "bold",
            padding: "12px 20px",
            borderRadius: "8px",
          },
          progressStyle: { background: "white" },
        });
  
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Something went wrong. Please try again.");
    }
  };



  const [preview, setPreview] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Get first file
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create local URL for preview
      setPreview(fileURL);
      setImageURL(fileURL);
      setImagePath(file.path || file.name); // Get image file path
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    
    <>

      {/* Preview Image */}
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img src={preview} alt="Preview" style={{ width: "200px", borderRadius: "10px" }} />
        </div>
      )}

      {/* Display Image Path */}
      {imagePath && (
        <p style={{ marginTop: "10px", color: "#333", fontSize: "14px" }}>
          <strong>Image Path:</strong> {imagePath}
        </p>
      )}



    <div className='artistbody'>
    <div className='artistLoggingPageImage' >
        <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
      </div>
      
      <div className='artistTitle'>Signing into Spotify <br /> as Artist</div>


      
      <br />
      <form onSubmit={handleArtistSigning}>
      <div className="artistLoggingContainer">

        <h3>Profile Image</h3>

          <div className='addImageArea' {...getRootProps()}  
          style={{ backgroundImage: preview ? `url(${preview})` : "none" ,cursor: "pointer",}}>
          {!preview && <><input {...getInputProps()} /><p><FontAwesomeIcon icon={faImage} size='3x' />
                <br />
                + Add Image</p></>}
          
          </div>

          
        <div className='itemSet01'>
            User Name <br />
            <input
              value={artistName}
              type="text"
              className='artistInput'
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='itemSet01'>
            Email <br />
            <input
              value={email}
              type="text"
              className='artistInput'
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className='itemSet01'>
            Password<br />
            <input
              value={password}
              type="password"
              className='artistInput'
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          
          </div>
          <div className='itemSet01'>
            Confirm Password<br />
            <input
              value={confirmPassword}
              type="password"
              className='artistInput'
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>


  <br /><br />

  <button type='submit' className='loggingButton' ><b>Sign In</b></button>
  <br />
  <b>Have an account?</b> <a href="/artistLogging"><u>Log In for Spotify</u></a>
</div>
      </form>
      
    </div>
      
    </>
  );
}

export default artistSigning;
