import React from "react";
import backButton from "../assets/profile/backButton.svg";
import "../styles/profile.css";
export const Profile = () => {
  return (
    <div className="main-container">
      <div>
        <button className="backButton">
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
          User Name
        </p>
        <p>get the user name from the backend</p>
      </div>
      <div>
        <form action="">
          <div className="form-group">
            <label>Username</label>
            <input
              className="profile-input"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="profile-input"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="profile-input"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label>Subscription Type</label>
            <div className="dob">
              <select>
                <option>Normal</option>
                <option>Premium</option>
              </select>
            </div>
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
