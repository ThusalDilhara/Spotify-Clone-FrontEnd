import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LoginComponent from "./components/Login";
import SignupComponent from "./components/Signup";
import Header from "./components/Header";
import Sidebar from "./components/sideBar";
import MusicPlayer from "./components/musicPlayer";
import Home from "./components/Home";
import ArtistLogging from "./components/artistLogging";
import ArtistSigning from "./components/artistSigning";
import ArtistDashBoard from "./components/artistDashBoard";
import { Footer } from "./components/Footer";
import ArtistPage from "./components/ArtistPage";
import LikedSongPage from "./components/LikedSongPage";
import Profile from "./components/Profile";
import FollowedArtistPage from "./components/FollowedArtistPage";
import ProtectedRoute from "./auth/protectedRoute";
import Support from "./components/Support";
import AboutUs from "./components/AboutUs";
import ArtistImageUpload from "./test/uploadImage";
import UploadSong from "./test/uploadSong";
import PlaylistPage from "./components/PlaylistPage";
import axios from "axios";

function App() {
  const updateSongRef = useRef(null);
  const [songs, setSongs] = useState([]); 

  useEffect(() => {

     axios.get('http://localhost:8080/api/songs/getdetails')
    .then((response)=> setSongs(response.data))
  }
  , []);

  const Success = () => {
    useEffect(() => {
      toast.success("Payment Successful! Enjoy Premium Features!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }, []);
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Thank You for Upgrading to Premium!</h1>
        <p>Enjoy your ad-free music experience and exclusive features.</p>
      </div>
    );
  };

  const Cancel = () => {
    useEffect(() => {
      toast.error("Payment Cancelled. Please Try Again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }, []);
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Payment Cancelled</h1>
        <p>You can try again to upgrade to Premium.</p>
      </div>
    );
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{
          marginTop: "50px",
          zIndex: "9999",
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: "12px",
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<SignupComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/support" element={<Support />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/upload" element={<ArtistImageUpload />} />
          <Route path="/uploadSong" element={<UploadSong />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* Home Page Route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div>
                  <Header updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} />
                  <Sidebar />
                  <Home 
                    updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} 
                    setSongs={setSongs} // Update song list
                  />
                  <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} songs={songs} />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Artist Page Route */}
          <Route
            path="/artist/:artistId"
            element={
              <div>
                <Header updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} />
                <Sidebar />
                <ArtistPage 
                  updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} 
                  setSongs={setSongs} 
                />
                <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} songs={songs} />
              </div>
            }
          />

          {/* Playlist Page Route */}
          <Route
            path="/playlist/:playlistId"
            element={
              <div>
                <Header updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} />
                <Sidebar />
                <PlaylistPage 
                  updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} 
                  setSongs={setSongs} 
                />
                <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} songs={songs} />
              </div>
            }
          />

          {/* Liked Songs Page Route */}
          <Route
            path="/likedSong"
            element={
              <div>
                <Header updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} />
                <Sidebar />
                <LikedSongPage 
                  updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} 
                  setSongs={setSongs} 
                />
                <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} songs={songs} />
              </div>
            }
          />

          {/* Followed Artist Page Route */}
          <Route
            path="/followedArtist"
            element={
              <div>
                <Header updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} />
                <Sidebar />
                <FollowedArtistPage setSongs={setSongs} />
                <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} songs={songs} />
              </div>
            }
          />

          {/* Artist Logging & Dashboard Routes */}
          <Route path="/artistLogging" element={<ArtistLogging />} />
          <Route path="/artistSigning" element={<ArtistSigning />} />
          <Route path="/artistDashboard" element={<ArtistDashBoard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
