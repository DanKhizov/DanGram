import React, { Component } from "react";
import UserInfo from "../UserInfo";
import UserImages from "../UserImages";
import "./UserPage.css";

export default class UserPage extends Component {
  render() {
    return (
      <div>
        <UserInfo />
        <UserImages />
      </div>
    );
  }
}
