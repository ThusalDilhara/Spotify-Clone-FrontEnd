import React, { useState } from "react";
import "../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginComponent = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({
        ...errors,
        email: emailError,
      });
      return;
    }

    setErrors({
      ...errors,
      email: "",
    });

    // Proceed with form submission
    console.log("Form submitted successfully:", {
      email,
      password,
    });
  };

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
        <div className="text">Enter your email</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group-login-email">
            <input
              type="text"
              placeholder="Enter your Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="error-message-form-login">
            {errors.email && (
              <div className="error-message-form-login-email">
                {errors.email}
              </div>
            )}
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
              {visible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="text-forgot">
          <br />
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
