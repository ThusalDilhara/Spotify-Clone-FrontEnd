import React, { useState } from "react";
import "../styles/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";


const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { login } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setErrors((prev) => ({ ...prev, email: "" }));

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.message || "Invalid credentials");
        return;
      }

      const user = await response.json();
      console.log("Login successful:", user);
      login(user); 
      // Save user info (e.g., token) to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Something went wrong. Please try again.");
    }
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

          <div className="error-message-form-login">
            {loginError && <div className="error-message">{loginError}</div>}
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
