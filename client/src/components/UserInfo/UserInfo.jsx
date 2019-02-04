import React, { Component } from "react";
import "./UserInfo.css";
import { connect } from "react-redux";

class UserInfo extends Component {
  render() {
    const { avatar, name, content, status: userStatus } = this.props.data;
    const postsCount = content.posts.length;
    const followersCount = content.followers.length;
    const followingCount = content.followers.length;

    return (
      <div>
        <header className="user-info">
          <img src={avatar} alt="avatar" className="avatar" />
          <div className="user-description">
            <div className="details">
              <span className="login">{name}</span>
              <div className="follow-button">Follow</div>
            </div>
            <div className="social">
              <span>
                <b>{postsCount}</b> posts
              </span>
              <span>
                <b>{followersCount}</b> followers
              </span>
              <span>
                <b>{followingCount}</b> following
              </span>
            </div>
            <div className="status">{userStatus}</div>
          </div>
        </header>
        <div className="user-stories"> </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dataPage
});

export default connect(
  mapStateToProps,
  null
)(UserInfo);
