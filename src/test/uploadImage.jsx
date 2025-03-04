import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRegister = async () => {
    if (!artistName || !email || !password || !file) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    setLoading(true);

    try {
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "spotifyClone");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxwvh1aal/image/upload",
        formData
      );

      const artistImage = cloudinaryResponse.data.secure_url;

     
      const registerData = {
        artistName,
        email,
        password,
        artistImage,
      };

      const backendResponse = await axios.post(
        "http://localhost:8080/api/artist/register", 
        registerData
      );

      console.log("Registration successful:", backendResponse.data);
      alert("Registration Successful!");

     
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Artist Name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Register;
