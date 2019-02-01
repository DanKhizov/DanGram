import React, { Component } from "react";
import "./FileUploader.css";

import { connect } from "react-redux";
import { uploadFile } from "../../store/actions/fileHandler";

class FileUploader extends Component {
  state = { selectedFile: null };

  fileSelectHandler = e => {
    const selectedFile = e.target.files[0];

    const fd = new FormData();
    fd.append("file", selectedFile, selectedFile.name);
    console.log(fd);

    this.props.uploadFile(fd);
    console.log(this.props);
  };

  fileUploadHandler = async () => {};

  render() {
    return (
      <div className="file-uploader">
        <input
          type="file"
          onChange={this.fileSelectHandler}
          name="file"
          id="file"
          className="inputfile"
        />
        <label htmlFor="file">Upload new image</label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.dataPage
});

export default connect(
  mapStateToProps,
  { uploadFile }
)(FileUploader);
