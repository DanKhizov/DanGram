import React, { Component } from "react";
import "./UserPage.css";

import UserInfo from "../UserInfo";
import UserImages from "../UserImages";
import { getUsersData } from "../../store/actions/dataHandler";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import isEmpty from "../../isEmpty";
import Spinner from "../Spinner/Spinner";
import { NotFound } from "./";

class UserPage extends Component {
  componentDidMount() {}

  render() {
    const { data } = this.props;

    // TODO !!!!!!!!!
    const { history, getUsersData } = this.props;
    const { pathname } = history.location;
    const user = pathname.split(/^\//)[1];
    if (user !== data.name) getUsersData(user);
    // ==============

    if (isEmpty(data)) return <Spinner />;
    if (data.error) return <NotFound />;

    return (
      <div>
        <UserInfo />
        <UserImages />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dataPage
});

export default connect(
  mapStateToProps,
  { getUsersData }
)(withRouter(UserPage));
