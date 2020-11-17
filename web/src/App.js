import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from 'antd';
import BaseRouter from "./routes";
import "antd/dist/antd.css";
import * as actions from "./store/actions/auth";

import CustomLayout from "./layout/Layout";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Suspense fallback={<Spin />}>
          <Router>
            <CustomLayout {...this.props}>
              <BaseRouter />
            </CustomLayout>
          </Router>
          </ Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
            isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
            onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
