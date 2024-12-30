import React, { useState } from "react";
import "../styles/signup.css";
import { CiCircleChevRight } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
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
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="text-password-signup">Password</div>

          <div className="input-group-signup">
            <input
              className="signup-input"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              required
            />
            <div
              className="password-button"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </div>
          </div>
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
            <CiCircleChevRight /> 10 characters (example: # ? ! &)
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
