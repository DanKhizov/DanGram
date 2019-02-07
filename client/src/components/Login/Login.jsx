import React, { Component } from "react";
import "./Login.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { tryLoginUser } from "../../store/actions/authentication";

class Login extends Component {
	state = {
		email: "",
		password: "",
		answer: "",
		errors: {},
	};

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();

		const { email, password, answer } = this.state;
		const user = { email, password };
		const { auth, tryLoginUser } = this.props;
		const { uuid } = auth;

		if (uuid) user.clientTwoFA = { uuid, answer };

		tryLoginUser(user);
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/");
		}
	}

	componentDidUpdate(prevProps) {
		const { errors, auth, history } = this.props;

		if (prevProps.auth.isAuthenticated !== auth.isAuthenticated) {
			history.push("/");
		}

		if (prevProps.errors !== errors) {
			this.setState({ errors });
		}
	}

	render() {
		const { errors } = this.state;
		const { uuid } = this.props.auth;

		return (
			<div className="login-page">
				<div className="login-form">
					<h1>DanGram</h1>
					<form onSubmit={this.handleSubmit}>
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
						{uuid && (
							<div className="form-group">
								<input
									type="text"
									placeholder="Code from SMS"
									name="answer"
									className="input-field"
									onChange={this.handleInputChange}
									value={this.state.answer}
								/>
								{errors.twoFA && <div className="invalid">{errors.twoFA}</div>}
							</div>
						)}
						<div className="form-group">
							<button type="submit" className="button-submit">
								Log in
							</button>
						</div>
					</form>
					<div className="login-facebook">
						<i className="facebook icon" />
						Login with Facebook
					</div>
				</div>
				<div className="login-form">
					<p>
						Don't have an account? <Link to="/register">Sign up</Link>
					</p>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	tryLoginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	uuid: PropTypes.string,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	uuid: state.auth.uuid,
});

export default connect(
	mapStateToProps,
	{ tryLoginUser }
)(Login);
