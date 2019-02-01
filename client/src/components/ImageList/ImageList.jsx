import React from "react";
import { connect } from "react-redux";

const ImageList = ({ data }) => {
  const { images } = data;

  const baseUrl = "http://localhost:5000/api/files/";
  const imageList = images.map(url => {
    return (
      <div className="box" key={url}>
        <img src={`${baseUrl}${url}`} alt={url} />
      </div>
    );
  });

  return imageList;
};

const mapStateToProps = state => ({
  data: state.dataPage
});

export default connect(
  mapStateToProps,
  null
)(ImageList);
