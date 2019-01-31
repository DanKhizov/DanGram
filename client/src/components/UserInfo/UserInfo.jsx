import React, { Component } from "react";
import "./UserInfo.css";
import { connect } from "react-redux";

class UserInfo extends Component {
  render() {
    const { data } = this.props;

    const { avatar, name, content, status: userStatus } = data;
    const posts = content.posts.length;
    const followers = content.followers.length;
    const following = content.followers.length;

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
                <b>{posts}</b> posts
              </span>
              <span>
                <b>{followers}</b> followers
              </span>
              <span>
                <b>{following}</b> following
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
