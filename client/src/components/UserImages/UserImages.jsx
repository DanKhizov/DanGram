import React, { Component } from "react";
import "./UserImages.css";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ImageList from "../ImageList/ImageList";

class UserImages extends Component {
  state = {
    selectedFile: null,
    images: []
  };

  componentDidMount() {
    this.getUsersImages();
  }

  getUsersImages = async () => {
    const { id } = this.props.auth.user;

    const res = await axios.get(`/api/users/${id}/images`);
    const { images } = res.data;

    this.setState({ images });
  };

  fileSelectHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  fileUploadHandler = async () => {
    const { selectedFile } = this.state;
    const fd = new FormData();
    fd.append("file", selectedFile, selectedFile.name);
    const res = await axios.post("/api/files/upload", fd);
    console.log(res);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedFile !== prevState.selectedFile) {
      this.fileUploadHandler();
    }
  }

  render() {
    const { images } = this.state;

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
        <ImageList images={images} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(UserImages));
