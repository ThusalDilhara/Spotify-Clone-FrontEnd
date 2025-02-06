import React from "react";

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Spotify Clone</strong>, your go-to music streaming
        platform. Our mission is to provide an immersive experience for music
        lovers with a seamless and intuitive interface.
      </p>

      <h2>🎵 Our Team</h2>
      <ul>
        <li>
          <strong>Developer:</strong> Janada
        </li>
        <li>
          <strong>Tech Stack:</strong> React, Spring Boot, MongoDB
        </li>
        <li>
          <strong>Version:</strong> 1.0.0
        </li>
      </ul>

      <h2>📞 Contact Us</h2>
      <p>
        <strong>Email:</strong> support@spotifyclone.com <br />
        <strong>Phone:</strong> +94 71 234 5678 <br />
        <strong>Location:</strong> Kalutara, Sri Lanka
      </p>

      <h2>🔗 Follow Us</h2>
      <ul>
        <li>
          <a href="https://twitter.com/yourhandle" target="_blank">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com/yourrepo" target="_blank">
            GitHub
          </a>
        </li>
      </ul>

      <h2>🛠️ Support</h2>
      <p>
        Facing issues? Visit our <a href="/support">Support Page</a> or reach
        out to us via email.
      </p>
    </div>
  );
}

export default AboutUs;
