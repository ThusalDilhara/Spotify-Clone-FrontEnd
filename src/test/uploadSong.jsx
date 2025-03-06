import React, { useState } from "react";
import axios from "axios";

const UploadSong = () => {
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
 
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const artistId = "67c88b75670ca6310dcd8993";

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!songName || !artist || !artistId || !imageFile || !audioFile) {
      alert("Please fill all fields and select both image and audio files.");
      return;
    }

    setLoading(true);

    try {
    
      const imageFormData = new FormData();
      imageFormData.append("file", imageFile);
      imageFormData.append("upload_preset", "spotifyClone");

      const imageResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxwvh1aal/image/upload",
        imageFormData
      );
      const ImageUrl = imageResponse.data.secure_url;

     
      const audioFormData = new FormData();
      audioFormData.append("file", audioFile);
      audioFormData.append("upload_preset", "spotifyClone");

      const audioResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxwvh1aal/video/upload",
        audioFormData
      );
      const audioUrl = audioResponse.data.secure_url;

    
      const songData = {
        songName,
        artist,
        url: audioUrl,
        ImageUrl,
        artistId,
      };

      const backendResponse = await axios.post(
        "http://localhost:8080/api/songs/saveSong", 
        songData
      );

      alert("Song Uploaded Successfully!");
      console.log("Backend Response:", backendResponse.data);

     
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Song</h2>
      <input
        type="text"
        placeholder="Song Name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artist Name"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <input type="file" accept="audio/*" onChange={handleAudioChange} required />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadSong;
