import React, { Component } from 'react';
import './UserImages.css';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';

export default class UserImages extends Component {
	state = {
		selectedFile: null,
	};

	componentDidMount() {
		// fetch data
	}

	fileSelectHandler = e => {
		this.setState({ selectedFile: e.target.files[0] });
	};

	fileUploadHandler = async () => {
		const { selectedFile } = this.state;
		const fd = new FormData();
		fd.append('image', selectedFile, selectedFile.name);
		const res = await axios.post('/api/users/images', fd);
		console.log(res);
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedFile !== prevState.selectedFile) {
			this.fileUploadHandler();
		}
	}

	render() {
		return (
			<div>
				<Jumbotron>
					<input
						type="file"
						onChange={this.fileSelectHandler}
						name="file"
						id="file"
						className="inputfile"
					/>
					<label htmlFor="file">Upload image</label>
				</Jumbotron>
				<h1>Your images</h1>
			</div>
		);
	}
}
