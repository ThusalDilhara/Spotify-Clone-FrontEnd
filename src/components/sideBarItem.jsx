
import React from 'react';

const SidebarItem = ({ img, text }) => {
  return (
    <div className="sidebar_item_wrapper">
      <img src={img} alt={text} className="sidebar_item_image" />
      <li className="sidebar_item">{text}</li>
    </div>
  );
};

export default SidebarItem;
