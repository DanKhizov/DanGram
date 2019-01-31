import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authentication";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthLinks = props => {
  const { name } = props.user;
  const { history, logoutUser } = props;

  const onLogout = () => {
    logoutUser(history);
  };

  return (
    <div className="auth">
      <Link to={`/${name}`} className="nickname">
        {name}
      </Link>
      <div className="sign-up" onClick={onLogout}>
        Logout
      </div>
    </div>
  );
};

AuthLinks.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(AuthLinks));
