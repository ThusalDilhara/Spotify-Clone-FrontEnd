import React from "react";
import "../styles/Home.css";

const AlbumItem = ({ title, desc, img }) => {
  return (
    <div className="card">
      <img src={img} alt={title} />
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default AlbumItem;
