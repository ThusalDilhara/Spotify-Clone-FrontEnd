import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LoginComponent from "./components/Login";
import SignupComponenet from "./components/Signup";
import Header from "./components/Header";
import Sidebar from "./components/sideBar";
import MusicPlayer from "./components/musicPlayer";
import Home from "./components/Home";
import { Profile } from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupComponenet />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/home"
            element={
              <div>
                <Header />
                <Sidebar />
                <MusicPlayer />
                <Home />
                <Profile />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
