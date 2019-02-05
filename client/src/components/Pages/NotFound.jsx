import React from "react";
import "./NotFound.css";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-msg">
      <h1>Sorry, this page isn't available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.{" "}
        <br />
        Go back to <Link to="/">home page</Link>.
      </p>
    </div>
  );
};

export default NotFound;
