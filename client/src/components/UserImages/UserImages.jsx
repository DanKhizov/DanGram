import React, { Component } from "react";
import "./UserImages.css";

export default class UserImages extends Component {
  render() {
    const photo1 =
      "https://pp.userapi.com/c845020/v845020731/14971e/k4lsGgvxyCE.jpg";
    const photo2 =
      "https://pp.userapi.com/c638020/v638020361/54840/zTGCLnccJzM.jpg";
    const photo3 =
      "https://pp.userapi.com/c840535/v840535464/8b2e9/jVtydR26GHM.jpg";

    return (
      <div className="posts">
        <div className="box">
          <img src={photo1} alt="photo" />
        </div>
        <div className="box">
          <img src={photo2} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
        <div className="box">
          <img src={photo3} alt="photo" />
        </div>
      </div>
    );
  }
}
