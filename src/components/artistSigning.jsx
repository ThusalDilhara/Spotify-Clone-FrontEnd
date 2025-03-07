import React, { useState, useCallback } from "react";
import '../styles/artistLogging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpotify } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function ArtistSigning() {
  const navigate = useNavigate(); 

  // Variables to save artist details from form
  const [artistName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);

  // Display toast message
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

  //validate email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return "";
  };

  // Handle artist sign-in
  const handleArtistSigning = async (e) => {
    e.preventDefault();

    

    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "red", "white");
      return;
    }

    try {
      let artistImage = null;

      if (file) {
        // Create FormData for Cloudinary image upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "spotifyClone");

        // Upload image to Cloudinary
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dxwvh1aal/image/upload",
          formData
        );

        // Get the image URL
        artistImage = cloudinaryResponse.data.secure_url;
      }

      // Send data to backend API
      const responseOfArtistLogging = await fetch("http://localhost:8080/api/artist/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistName,
          email,
          password,
          artistImage,
        }),
      });

      if (!responseOfArtistLogging.ok) {
        showToast("Backend Error..!, No response found.", "red", "white");
        return;
      }

      // Redirect to login page after successful registration
      navigate("/artistLogging");
      showToast("Artist Signup successful!", "#1DB954", "white");

    } catch (error) {
      showToast("Error during registration!", "red", "white");
      console.error("Registration error:", error);
    }
  };

  // Image preview state
  const [preview, setPreview] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file1 = acceptedFiles[0]; // Get the first dropped file
    if (file1) {
      const fileURL = URL.createObjectURL(file1); // Create a local URL for preview
      setPreview(fileURL);
      setFile(file1);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Only accept image files
  });

  return (
    <>
      <div className='artistbody'>
        <div className='artistLoggingPageImage'>
          <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
        </div>

        <div className='artistTitle'>
          Signing into Spotify <br /> as Artist
        </div>

        <br />
        <form onSubmit={handleArtistSigning}>
          <div className="artistLoggingContainer">
            <h3>Profile Image</h3>

            <div className='addImageArea' {...getRootProps()}
              style={{ backgroundImage: preview ? `url(${preview})` : "none", cursor: "pointer" }}>
              {!preview && (
                <>
                  <input {...getInputProps()} />
                  <p><FontAwesomeIcon icon={faImage} size='3x' /><br />+ Add Image</p>
                </>
              )}
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
                type="email"
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

            <button type='submit' className='loggingButton'>
              <b>Sign In</b>
            </button>
            <br />
            <b>Have an account?</b> <a href="/artistLogging"><u>Log In for Spotify</u></a>
          </div>
        </form>

      </div>
    </>
  );
}

export default ArtistSigning;