import React, { Component } from "react";
import "./UserImages.css";
import FileUploader from "../FileUploader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UserImages extends Component {
  render() {
    const photo1 =
      "https://pp.userapi.com/c845020/v845020731/14971e/k4lsGgvxyCE.jpg";
    const photo2 =
      "https://pp.userapi.com/c638020/v638020361/54840/zTGCLnccJzM.jpg";

    console.log(this.props.data);

    const isAuthor = this.props.auth.user.name === this.props.data.name;
    console.log(isAuthor);

    return (
      <div>
        <h1>
          <span>Posts</span>
        </h1>
        {isAuthor ? <FileUploader /> : null}
        <div className="posts">
          <div className="box">
            <img src={photo1} alt="photo1" />
          </div>
          <div className="box">
            <img src={photo2} alt="photo1" />
          </div>
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
  null
)(withRouter(UserImages));
