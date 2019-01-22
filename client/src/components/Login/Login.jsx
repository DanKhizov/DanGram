import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authentication';

class Login extends Component {
	state = {
		email: '',
		password: '',
		answer: '',
		errors: {},
	};

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password, answer } = this.state;
		const user = { email, password };
		const uniqKey = localStorage.getItem('uniqKey');

		if (uniqKey) user.clientTwoFA = { uniqKey, answer };

		this.props.loginUser(user);
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		const uniqKey = localStorage.getItem('uniqKey');
		if (uniqKey) {
			this.setState(state => {
				return {
					...state,
					show2FA: true,
				};
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	render() {
		const { errors } = this.state;
		const uniqKey = localStorage.getItem('uniqKey');

		return (
			<div className="container login" style={{ marginTop: '50px' }}>
				<h2>Login</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email"
							className="form-control form-control-lg"
							name="email"
							onChange={this.handleInputChange}
							value={this.state.email}
						/>
						{errors.email && (
							<div className="invalid-feedback">{errors.email}</div>
						)}
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							className="form-control form-control-lg"
							name="password"
							onChange={this.handleInputChange}
							value={this.state.password}
						/>
						{errors.password && (
							<div className="invalid-feedback">{errors.password}</div>
						)}
					</div>

					{/* Debug */}
					{true && (
						<div className="form-group">
							<input
								type="text"
								placeholder="Code from SMS"
								name="answer"
								className="form-control form-control-lg"
								onChange={this.handleInputChange}
								value={this.state.answer}
							/>
							{errors.twoFA && (
								<div className="invalid-feedback">{errors.twoFA}</div>
							)}
						</div>
					)}
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Login User
						</button>
					</div>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
