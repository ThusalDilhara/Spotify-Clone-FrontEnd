import React, { useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth } from "./auth/authContext"; // Import the useAuth hook

function App() {
  const updateSongRef = useRef(null);

  // Success page for payments
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

  // Cancel page for payments
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

  // Protected Route Component
  const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth(); // Check if the user is authenticated
    return isAuthenticated ? element : <Navigate to="/login" />;
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
          {/* Public Routes */}
          <Route path="/" element={<SignupComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute
                element={
                  <div>
                    <Header
                      updateSong={(song) =>
                        updateSongRef.current && updateSongRef.current(song)
                      }
                    />
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
            }
          />
          <Route
            path="/artist/:artistId"
            element={
              <ProtectedRoute
                element={
                  <div>
                    <Header
                      updateSong={(song) =>
                        updateSongRef.current && updateSongRef.current(song)
                      }
                    />
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
            }
          />
          <Route
            path="/likedSong"
            element={
              <ProtectedRoute
                element={
                  <div>
                    <Header
                      updateSong={(song) =>
                        updateSongRef.current && updateSongRef.current(song)
                      }
                    />
                    <Sidebar />
                    <LikedSongPage
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
            }
          />
          <Route
            path="/followedArtist"
            element={
              <ProtectedRoute
                element={
                  <div>
                    <Header
                      updateSong={(song) =>
                        updateSongRef.current && updateSongRef.current(song)
                      }
                    />
                    <Sidebar />
                    <FollowedArtistPage />
                    <MusicPlayer
                      updateSong={(fn) => (updateSongRef.current = fn)}
                    />
                  </div>
                }
              />
            }
          />
          <Route path="/artistLogging" element={<ArtistLogging />} />
          <Route path="/artistSigning" element={<ArtistSigning />} />
          <Route
            path="/artistDashboard"
            element={<ProtectedRoute element={<ArtistDashBoard />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
