import React, { Component } from "react";
import "./UserImages.css";
import FileUploader from "../FileUploader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uploadFile } from "../../store/actions/fileHandler";
import ImageList from "../ImageList";

class UserImages extends Component {
	render() {
		const isAuthor = this.props.auth.user.name === this.props.data.name;

		return (
			<div>
				<h1>
					<span>Posts</span>
				</h1>
				{isAuthor ? <FileUploader /> : null}
				<ImageList />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	data: state.dataPage,
});

export default connect(
	mapStateToProps,
	{ uploadFile }
)(withRouter(UserImages));
