import React from "react";
import "./Navbar.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";

const Navbar = props => {
  const { isAuthenticated } = props.auth;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <i className="camera retro icon" />
            DanGram
          </Link>
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Navbar);
