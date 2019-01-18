import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authentication';
import { withRouter } from 'react-router-dom';
import { MenuItem, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';

class MainNavbar extends Component {
	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<Navbar inverse fluid collapseOnSelect style={{ borderRadius: '0px' }}>
				<Navbar.Header>
					<Navbar.Brand>
						<Link className="navbar-brand" to="/">
							Redux Node Auth
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<Link className="navbar-brand" to="/images">
							Images
						</Link>
					</Nav>
					<Nav pullRight>
						{isAuthenticated ? <AuthLinks {...this.props} /> : <GuestLinks />}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

MainNavbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(MainNavbar));

const AuthLinks = props => {
	const { logoutUser, auth } = props;
	const { user } = auth;

	const onLogout = e => {
		e.preventDefault();
		logoutUser(props.history);
	};

	const avatar = (
		<Image
			src={user.avatar}
			alt={user.name}
			title={user.name}
			circle
			style={{ width: '25px', marginRight: '5px' }}
		/>
	);

	return (
		<Nav pullRight>
			<NavDropdown title={avatar} id="basic-nav-dropdown">
				<li style={{ marginLeft: '2rem' }}>
					<h6>
						Signed in as <b>{user.name}</b>
					</h6>
				</li>
				<li>
					<Link to="/profile">Your status</Link>
				</li>
				<MenuItem divider />
				<li>
					<Link to="/profile">Your profile</Link>
				</li>
				<li>
					<Link className="dropdown-item" to="/profile/images">
						Your Images
					</Link>
				</li>
				<MenuItem divider />
				<MenuItem onClick={onLogout}>Logout</MenuItem>
			</NavDropdown>
		</Nav>
	);
};

const GuestLinks = () => {
	return (
		<Nav pullRight>
			<li>
				<Link className="nav-link" to="/register">
					Sign Up
				</Link>
			</li>
			<li>
				<Link className="nav-link" to="/login">
					Sign In
				</Link>
			</li>
		</Nav>
	);
};
