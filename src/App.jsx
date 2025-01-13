import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginComponent from "./components/Login";
import SignupComponenet from "./components/Signup";
import Header from "./components/Header";
import Sidebar from "./components/sideBar";
import MusicPlayer from "./components/musicPlayer";
import Home from "./components/Home";
import ArtistLogging from "./components/artistLogging";
import ArtistSigning from "./components/artistSigning";

function App() {
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
                <MusicPlayer />
                <Home />
              </div>
            }
          />
          <Route path="/artistLogging" element={<div>
                <ArtistLogging />
              </div>} />
          <Route path="/artistSigning" element={<div>
                <ArtistSigning />
              </div>} />    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
