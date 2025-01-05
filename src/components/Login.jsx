import React, { useState } from "react";
import "../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginComponent = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
          />
        </div>
        <h2>Log in to Spotify</h2>
        <div>
          <button className="login-button-verify">Continue with Google</button>
        </div>
        <div>
          <button className="login-button-verify">
            Continue with Facebook
          </button>
        </div>

        <div>
          <button className="login-button-verify">Continue with Apple</button>
        </div>
        <div>
          <hr />
        </div>
        <div className="text">Email or username</div>
        <form>
          <div className="input-group-login">
            <input
              type="text"
              placeholder="Username or Email"
              className="login-input"
              value={target}
              required
            />
          </div>

          <div className="text-password">Password</div>

          <div className="input-group-login">
            <input
              className="login-input"
              value={password}
              type={visible ? "text" : "password"}
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div
              className="password-button"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </div>
          </div>
          <button type="submit" className="login-button">
            <a href="/home"> Log In</a>
          </button>
        </form>
        <div className="text-forgot">
          <br></br>
          <u>Forgot your password?</u>
        </div>
        <div className="extra-options">
          <p>
            Don't have an account?{" "}
            <a href="/">
              <u>Sign up for Spotify</u>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
