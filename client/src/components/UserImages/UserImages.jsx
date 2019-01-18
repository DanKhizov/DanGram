import React, { Component } from 'react';
import axios from 'axios';
// import Dropzone from 'react-dropzone';

export default class UserImages extends Component {
	state = {
		selectedFile: null,
	};

	fileSelectHandler = e => {
		this.setState({ selectedFile: e.target.files[0] });
	};

	fileUploadHandler = () => {
		const { selectedFile } = this.state;
		const fd = new FormData();
		fd.append('image', selectedFile, selectedFile.name);
		axios.post('/api/users/images', fd).then(res => console.log(res));
	};

	render() {
		console.log(this.state);

		return (
			<div>
				<h1>Your images</h1>
				<input type="file" onChange={this.fileSelectHandler} />
				<button onClick={this.fileUploadHandler}>Send files</button>
			</div>
		);
	}
}
