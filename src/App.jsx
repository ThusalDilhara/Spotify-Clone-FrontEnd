import "./App.css";
import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginComponent from "./components/Login";
import SignupComponenet from "./components/Signup";
import Header from "./components/Header";
import Sidebar from "./components/sideBar";
import MusicPlayer from "./components/musicPlayer";
import Home from "./components/Home";
import { Footer } from "./components/Footer";
import ArtistPage from "./components/ArtistPage";
import { ToastContainer } from "react-toastify";
import LikedSongPage from "./components/LikedSongPage";
import Profile from "./components/Profile";
import FollowedArtistPage from "./components/FollowedArtistPage";

function App() {
  const updateSongRef = useRef(null);
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
          <Route path="/" element={<SignupComponenet />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/home"
            element={
              <div>
                <Header updateSong={(song) =>
                    updateSongRef.current && updateSongRef.current(song)
                  }/>
                <Sidebar />
                <Home
                  updateSong={(song) =>
                    updateSongRef.current && updateSongRef.current(song)
                  }
                />
                <MusicPlayer
                  updateSong={(fn) => (updateSongRef.current = fn)}
                />
              </div>
            }
          />
          <Route
            path="/artist/:artistId"
            element={
              <div>
                <Header />
                <Sidebar />
                <ArtistPage
                  updateSong={(song) =>
                    updateSongRef.current && updateSongRef.current(song)
                  }
                />
                <MusicPlayer
                  updateSong={(fn) => (updateSongRef.current = fn)}
                />
              </div>
            }
          />
          <Route
            path="/likedSong"
            element={
              <div>
              <Header />
              <Sidebar />
              <LikedSongPage 
                 updateSong={(song) =>
                  updateSongRef.current && updateSongRef.current(song)
                }/>
                 <MusicPlayer
                   updateSong={(fn) => (updateSongRef.current = fn)}/>
             </div>
             } />

           <Route
            path="/followedArtist"
            element={
              <div>
              <Header />
              <Sidebar />
              <FollowedArtistPage/>
               <MusicPlayer
                   updateSong={(fn) => (updateSongRef.current = fn)}/>
             </div>
             } />
            
            
           

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
