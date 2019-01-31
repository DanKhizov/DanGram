import React from "react";
import "./FileUploader.css";

const FileUploader = () => {
  return (
    <div className="file-uploader">
      <input
        type="file"
        // onChange={this.fileSelectHandler}
        name="file"
        id="file"
        className="inputfile"
      />
      <label htmlFor="file">Upload new image</label>
    </div>
  );
};

export default FileUploader;
