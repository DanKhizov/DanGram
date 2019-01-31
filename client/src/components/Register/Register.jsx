import React, { Component } from "react";
import "./Register.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../store/actions/authentication";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    errors: {}
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register-page">
        <div className="register-form">
          <form onSubmit={this.handleSubmit}>
            <h1>DanGram</h1>
            <p className="description">
              Sign up to see photos and videos from your friends.
            </p>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
              {errors.name && <div className="invalid">{errors.name}</div>}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
              {errors.email && <div className="invalid">{errors.email}</div>}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {errors.password && (
                <div className="invalid">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                name="password_confirm"
                onChange={this.handleInputChange}
                value={this.state.password_confirm}
              />
              {errors.password_confirm && (
                <div className="invalid">{errors.password_confirm}</div>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="button-submit">
                Sign up
              </button>
            </div>
          </form>
          <p className="policy">
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
        <div className="register-form">
          <p>
            Have an account? <Link to="/login">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
