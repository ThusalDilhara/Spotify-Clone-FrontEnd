import React, { useState } from "react";
import '../styles/artistLogging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpotify } from "react-icons/fa";

function artistLogging() {
    const navigate = useNavigate(); 

    const [artistEmail, setArtistEmail] = useState("");
    const [artistPassword, setArtistPassword] = useState("");
    const { login } = useAuth();
    const [loginError, setLoginError] = useState("");

  const handleNavigate = () => {
    navigate("/artistDashboard");
  };


  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return "";
  };

  const handleArtistLogging = async (e) => {
    e.preventDefault();
  
    if (!artistEmail || !artistPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }
  
    console.log("Sending request with:", { artistEmail, artistPassword });
  
    try {
      const responseOfArtistLogging = await fetch("http://localhost:8080/api/artist/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: artistEmail,
          password: artistPassword, }),
      });
  
      if (!responseOfArtistLogging.ok) {
        const errorData = await responseOfArtistLogging.json().catch(() => null);
        setLoginError(errorData?.message || "Invalid credentials");
        return;
      }
  
      const artist = await responseOfArtistLogging.json();
      console.log("Login successful:", artist);
      login(artist); 
      localStorage.setItem("artist", JSON.stringify(artist));
      navigate("/artistDashboard");
      toast.success('Welcome to the Artist DashBoard..!', {
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
  
  
  return (
    <>
    <div className='artistbody'>
    <div className='artistLoggingPageImage'>
        <FontAwesomeIcon icon={faSpotify} size="4x" color="white" />
      </div>
      
      <div className='artistTitle'>Logging into Spotify <br />as Artist</div>
      <br />
      <form onSubmit={handleArtistLogging}>
      <div className="artistLoggingContainer">
        <div className='itemSet01'>
        
          Email <br />
          <input
          value={artistEmail}
            id="artistEmail"
            type="text"
            className='artistInput'
            placeholder="Email"
            onChange={(e) => setArtistEmail(e.target.value)}
            required
          />
        </div>
        
        
        <div className='itemSet01'>
          Password<br />
          <input
          value={artistPassword}
          id="artistPassword"
            type="password"
            className='artistInput'
            placeholder="Password"
            onChange={(e) => setArtistPassword(e.target.value)}
            required
          />
        </div>
        <br /><br />
        <div className="error-message-form-login">
            {loginError && <div className="error-message">{loginError}</div>}
          </div>
      <button type="submit" className='loggingButton'><b>Log In</b></button>
        
        <br />
        <b>Don't have an account?</b> <a href="/artistSigning"><u>Sign up for Spotify</u></a>
      </div>
        </form>
      
    </div>
      
    </>
  );
}

export default artistLogging;
