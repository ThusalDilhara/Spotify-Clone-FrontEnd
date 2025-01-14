import React, { useState } from "react";
import "../styles/signup.css";
import { CiCircleChevRight } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [likedSongs, setLikedSongs] = useState([0]);
  const [LibraryPlaylists, setLibraryPlaylists] = useState([0]);
  const [followedArtists, setFollowedArtists] = useState([0]);

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return "Username is required.";
    if (username.length < 3) return "Username must be at least 3 characters.";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{10,}$/;
    if (!password) return "Password is required.";
    if (!passwordRegex.test(password))
      return "Password must contain at least 1 letter, 1 number or special character, and 10 characters.";
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(passwordField);

    if (usernameError || emailError || passwordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
      });
    } else {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: username,
              email,
              password: passwordField,
              likedSongs,
              LibraryPlaylists,
              followedArtists,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Signup successful", data);
          navigate("/login");
        } else {
          console.error("Signup failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
            className="spotify-logo"
          />
        </div>
        <div className="text1">Sign up to</div>
        <div className="text2">start listening</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (
              <div className="error-message-form-signup-username">
                {errors.username}
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <div className="error-message-form-signup-email">
                {errors.email}
              </div>
            )}
          </div>

          <div className="text-password-signup">Password</div>
          <div className="input-group-signup">
            <input
              className="signup-input"
              type={visible ? "text" : "password"}
              value={passwordField}
              onChange={(e) => setPasswordField(e.target.value)}
              id="password"
              placeholder="Password"
              required
            />
            <div
              className="password-button"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <div className="error-message-form-signup-password">
              {errors.password}
            </div>
          )}

          <div className="text-password1">
            Your password must contain at least
          </div>
          <div className="test-password2">
            <CiCircleChevRight /> 1 letter
          </div>
          <div className="test-password2">
            <CiCircleChevRight /> 1 number or special character (example: # ? !
            &)
          </div>
          <div className="test-password2">
            <CiCircleChevRight /> 10 characters
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="extra-options">
          <p>
            Already have an account?{" "}
            <a href="/login">
              <u>Log in</u>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
