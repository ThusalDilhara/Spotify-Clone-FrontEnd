import React from "react";
import "../styles/aboutus.css";

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="about-us">
        <div className="about-header">
          <h1>About Spotify Clone</h1>
          <p>Your ultimate destination for seamless music streaming.</p>
        </div>

        <div className="about-content">
          {/* Description Section */}
          <section className="description">
            <h2>🎵 About Our App</h2>
            <p>
              Spotify Clone is a music streaming platform built to provide users
              with an immersive music experience. Whether you're a fan of pop,
              rock, jazz, or classical, we've got it all. Enjoy high-quality
              audio streaming with an intuitive user interface that lets you
              easily discover and play your favorite tracks. We built this
              platform using cutting-edge technologies to ensure a smooth and
              seamless listening experience.
            </p>
          </section>

          {/* Inline Sections for Team & Contact */}
          <div className="inline-sections">
            <section className="team">
              <h2>👨‍💻 Meet Our Team</h2>
              <div className="team-member">
                <h3>Thusal Dilhara</h3>
                <h3>Dhananjaya Dilshan</h3>
                <h3>Janada Jayathilaka</h3>
                <p>
                  <strong>Tech Stack:</strong> React, Spring Boot, MongoDB
                </p>
              </div>
            </section>

            <section className="contact">
              <h2>📞 Contact Us</h2>
              <p>
                <strong>Email:</strong> support@spotifyclone.com
              </p>
              <p>
                <strong>Phone:</strong> +94 774718737
              </p>
              <p>
                <strong>Location:</strong> Kelaniya, Sri Lanka
              </p>
            </section>
          </div>

          {/* Inline Sections for Support & Follow Us */}
          <div className="inline-footer">
            <section className="support">
              <h2>🛠️ Support</h2>
              <p>
                Have any issues? Visit our <a href="/support">Support Center</a>
              </p>
            </section>

            <section className="social">
              <h2>🔗 Follow Us</h2>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{" "}
              |
              <a
                href="https://github.com/yourrepo"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              |
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
