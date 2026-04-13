import React from "react";
import "./loader.css";

const Loader = ({ fullScreen = false, text = "Loading..." }) => {
  return (
    <div className={fullScreen ? "loader-wrapper fullscreen" : "loader-wrapper"}>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;