import React from "react";
import backButton from "../assets/profile/backButton.svg";
import "../styles/profile.css";
import { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return "Username is required.";
    if (username.length < 3) return "Username must be at least 3 characters.";
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(passwordField);

    if (usernameError || passwordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
      });
    } else {
      // Proceed with form submission logic
      console.log("Form submitted successfully:", {
        username,
        passwordField,
      });
    }
  };
  return (
    <div className="main-container">
      <div>
        <button className="backButton" onClick={() => window.history.back()}>
          
          <img src={backButton} alt="backButton" />
        </button>
      </div>
      <div>
        <h1>Edit Profile</h1>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "small",
          }}
        >
      
        </p>
       
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              className="profile-input"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (
              <div className="error-message-form-profile-username">
                {errors.username}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="profile-input"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="profile-input"
              type="text"
              id="password"
              placeholder="Enter your password"
              value={passwordField}
              onChange={(e) => setPasswordField(e.target.value)}
              required
            />
            <div>
              {errors.password && (
                <div className="error-message-form-profile-password">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Subscription Type</label>
            
          </div>
          <div className="button-container">
            <button className="button-delete" type="">
              Delete Profile
            </button>
            <button className="button-save" type="submit">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
