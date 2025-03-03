import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { Footer } from "./Footer";
import axios from "axios"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const userId = JSON.parse(localStorage.getItem('user')).userId;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
  });

 
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/getUserDetails/${userId}`)
      .then((response) => {
        const user = response.data;
        setUserName(user.userName);
        setEmail(user.email);
        setSubscriptionType(user.subscriptionType);
        setPasswordField(user.password);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load profile details.");
      });
  }, [userId]);

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
    const usernameError = validateUsername(userName);
    const passwordError = passwordField ? validatePassword(passwordField) : "";

    if (usernameError || passwordError) {
      setErrors({
        userName: usernameError,
        password: passwordError,
      });
      return;
    }

    // Prepare updated user data
    const updatedUser = {
      id: userId,
      userName,
      email,
      subscriptionType,
      password: passwordField ? passwordField : undefined,
    };

   
    axios
      .post("http://localhost:8080/api/users/updateUser", updatedUser)
      .then((response) => {
        toast.success("Profile updated successfully!");
        
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <div className="main-container">
        <div>
          <h1>Edit Profile</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="profile-input"
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              {errors.userName && (
                <div className="error-message-form-profile-username">
                  {errors.userName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="profile-input"
                type="email"
                id="email"
                value={email}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="profile-input"
                type="text"
                id="password"
                placeholder="Enter new password (optional)"
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
              />
              {errors.password && (
                <div className="error-message-form-profile-password">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Subscription Type</label>
              <select className="profile-input" id="subscriptionType" disabled>
                <option value="free" selected={subscriptionType === "free"}>
                  Free
                </option>
                <option
                  value="premium"
                  selected={subscriptionType === "premium"}
                >
                  Premium
                </option>
              </select>
            </div>

            <div className="button-container">
              <button className="button-delete" type="button">
                Delete Profile
              </button>
              <button className="button-save" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="space"></div>
      <div className="footer-style">
        <Footer />
      </div>
      <div className="space"></div>
    </>
  );
};

export default Profile;
