import React, { useState } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import "../styles/support.css";

function Support() {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Support Request: ${selectedOption}`;
    const body = `Email: ${email}%0D%0A%0D%0AMessage: ${message}`;
    window.location.href = `mailto:spotifysupport@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="sup-container">
        <div className="sup-box">
          <h1>Spotify Support</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="issue">What can we help you with?</label>
              <select
                id="issue"
                value={selectedOption}
                onChange={handleDropdownChange}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Account Issues">Account Issues</option>
                <option value="Payment Issues">Payment Issues</option>
                <option value="Technical Issues">Technical Issues</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or feedback"
                required
              />
            </div>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className="sup-footer">
        <Footer />
      </div>
    </>
  );
}

export default Support;
