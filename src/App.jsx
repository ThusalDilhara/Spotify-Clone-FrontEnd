import "./App.css";
import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginComponent from "./components/Login";
import SignupComponenet from "./components/Signup";
import Header from "./components/Header";
import Sidebar from "./components/sideBar";
import MusicPlayer from "./components/musicPlayer";
import Home from "./components/Home";
import ArtistPage from "./components/ArtistPage";

function App() {

  const updateSongRef = useRef(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<SignupComponenet/>} />
          <Route path="/login" element={<LoginComponent/>} />
          <Route
            path="/home"
            element={
              <div>
                <Header />
                <Sidebar />
                <Home updateSong={(song) => updateSongRef.current && updateSongRef.current(song)} />
                <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} />
              </div>
            }
          />
           <Route path="/artist/:artistId" element ={
             <div>
             <Header />
             <Sidebar />
             <ArtistPage />
             <MusicPlayer updateSong={(fn) => (updateSongRef.current = fn)} />
           </div>
           } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
