import React, { Component } from "react";
import "./UserInfo.css";

export default class UserInfo extends Component {
  render() {
    const avatarUrl =
      "https://instagram.fhel3-1.fna.fbcdn.net/vp/b1e89345c2d901767ce2757f8d834888/5CE17E19/t51.2885-19/s150x150/39140822_503687756760236_1901408362973626368_n.jpg?_nc_ht=instagram.fhel3-1.fna.fbcdn.net";

    return (
      <div>
        <header className="user-info">
          <img src={avatarUrl} alt="avatar" className="avatar" />
          <div className="user-description">
            <div className="details">
              <span className="login">sofya_orlo</span>
              <div className="follow-button">Follow</div>
            </div>
            <div className="social">
              <span>
                <b>401</b> posts
              </span>
              <span>
                <b>1,250</b> followers
              </span>
              <span>
                <b>322</b> following
              </span>
            </div>
            <div className="status">
              <h5>La Fille Bien Française</h5>
              <p>
                Very sassy, very classy <br />
                Américaine mais je parle russe 🇺🇸🇷🇺
              </p>
            </div>
          </div>
        </header>
        <div className="user-stories"> </div>
      </div>
    );
  }
}
