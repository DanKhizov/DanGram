import React from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

const ImageList = ({ images }) => {
  const imgURL = "http://localhost:5000/api/files/";
  const imageList = images.map(url => {
    return (
      <Col md={4} sm={6} xs={12}>
        <Image src={`${imgURL}${url}`} rounded responsive />
      </Col>
    );
  });

  return (
    <div>
      <Grid>
        <Row>{imageList}</Row>
      </Grid>
    </div>
  );
};

export default ImageList;
