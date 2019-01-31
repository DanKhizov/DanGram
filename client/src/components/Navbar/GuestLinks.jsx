import React from "react";
import { Link } from "react-router-dom";

const GuestLinks = () => {
  return (
    <div className="auth">
      <Link to="/login">
        <div className="log-in">Log in</div>
      </Link>
      <Link to="/register">
        <div className="sign-up">Sign up</div>
      </Link>
    </div>
  );
};

export default GuestLinks;
