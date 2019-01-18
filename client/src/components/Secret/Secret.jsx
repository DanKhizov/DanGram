import React, { Component } from 'react';
import axios from 'axios';

export default class Secret extends Component {
	state = {
		content: null,
	};

	componentDidMount() {
		const token = localStorage.jwtToken;
		const getData = async url => {
			const res = await axios.post(url, { token });

			const { data, status } = res;
			const { content } = data;

			if (content && status === 200) {
				this.setState({ content });
			}
		};

		if (token) {
			getData('/api/users/secret');
		} else {
			// you must be auth to see page
		}
	}

	render() {
		const { content } = this.state;
		console.log(this.state);

		return (
			<div>
				<h1>Secret</h1>
				<h3>{content}</h3>
			</div>
		);
	}
}
