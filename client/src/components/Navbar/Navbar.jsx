import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <i class="camera retro icon" />
          DanGram
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="auth">
          <div className="log-in">Log in</div>
          <div className="sign-up">Sign up</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
