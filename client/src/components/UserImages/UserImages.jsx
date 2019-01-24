import React, { Component } from "react";
import "./UserImages.css";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";

export default class UserImages extends Component {
  state = {
    selectedFile: null
  };

  componentDidMount() {
    this.getUsersImages();
  }

  getUsersImages = async () => {
    const res = await axios.get("/api/files/allFiles");
    console.log(res.data);
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
    const imgURL = "http://localhost:5000/api/gallery/image/";

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
        <img src={`${imgURL}8726e41e054a532ea368bb994469795f.jpg`} alt="" />
      </div>
    );
  }
}
