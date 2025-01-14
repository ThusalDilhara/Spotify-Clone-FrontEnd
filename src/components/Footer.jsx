import React from "react";
import "../styles/footer.css";
import twitter from "../assets/footer/twitter.svg";
import facebook from "../assets/footer/facebook.svg";
import instagram from "../assets/footer/instagram.svg";

export const Footer = () => {
  return (
    <div>
      <div className="main-row">
        <div className="column">
          <ul>
            <li
              className="no-hover"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Company
            </li>

            <li>About</li>
            <li>Jobs</li>
            <li>For the Record</li>
          </ul>
        </div>
        <div className="column1">
          <ul>
            <li
              className="no-hover"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Communities
            </li>

            <li>For Artists</li>
            <li>Developers</li>
            <li>Advertising</li>
            <li>Investors</li>
            <li>Vendors</li>
          </ul>
        </div>
        <div className="column1">
          <ul>
            <li
              className="no-hover"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Useful links
            </li>

            <li>Support</li>
            <li>Free Mobile App</li>
          </ul>
        </div>
        <div className="column1">
          <ul>
            <li
              className="no-hover"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Spotify Plans
            </li>

            <li>Premium Individual</li>
            <li>Premium Duo</li>
            <li>Premium Family</li>
            <li>Premium Student</li>
            <li>Spotify Free</li>
          </ul>
        </div>
        <div className="footer-icons">
          <img
            src={twitter}
            alt="twitter"
            onClick={() =>
              window.open(
                "https://x.com/Spotify?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
                "_blank"
              )
            }
          />
          <img
            src={facebook}
            alt="facebook"
            onClick={() =>
              window.open(
                "https://web.facebook.com/Spotify/?_rdc=1&_rdr#",
                "_blank"
              )
            }
          />
          <img
            style={{
              marginTop: "-2px",
            }}
            src={instagram}
            alt="instagram"
            onClick={() =>
              window.open("https://www.instagram.com/spotify/", "_blank")
            }
          />
        </div>
      </div>
      <div className="horizontal-line">
        <hr />
      </div>
      <div className="horizontal-phrases">
        <p>Legal</p>
        <p>Safety&PrivacyCenter</p>
        <p>PrivacyPolicy</p>
        <p>Cookies</p>
        <p>AboutAds</p>
        <p>Accessibility</p>
        <p className="sp">2025 Spotify AB</p>
      </div>
    </div>
  );
};
