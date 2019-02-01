import React, { Component } from "react";
import "./UserImages.css";
import FileUploader from "../FileUploader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uploadFile } from "../../store/actions/fileHandler";
import ImageList from "../ImageList";

class UserImages extends Component {
  render() {
    const photo1 =
      "http://localhost:5000/api/files/69dda0519d0910af7976e8d6fb1fb291.jpg";
    const photo2 =
      "https://pp.userapi.com/c638020/v638020361/54840/zTGCLnccJzM.jpg";

    const isAuthor = this.props.auth.user.name === this.props.data.name;

    return (
      <div>
        <h1>
          <span>Posts</span>
        </h1>
        {isAuthor ? <FileUploader /> : null}
        <div className="posts">
          <ImageList />
        </div>
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
)(withRouter(UserImages));
