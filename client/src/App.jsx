import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authentication';

import Navbar from './components/MainNavbar/';
import Register from './components/Register/';
import Login from './components/Login/';
import Home from './components/Home/';
import NotFound from './components/NotFound/';
import Secret from './components/Secret';
import ImageList from './components/ImageList';
import UserImages from './components/UserImages/';
import Profile from './components/Profile';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/register/" component={Register} />
								<Route exact path="/login/" component={Login} />
								<Route exact path="/secret/" component={Secret} />
								<Route exact path="/images/" component={ImageList} />
								<Route exact path="/profile/" component={Profile} />
								<Route exact path="/profile/images" component={UserImages} />

								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
