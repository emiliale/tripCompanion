import React from "react";
import { Divider } from "antd";
import AboutApp from "./AboutApp";
import AboutFunctions from "./AboutFunctions";
import MediaQuery from 'react-responsive'

class Main extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224} device={{ deviceWidth: 1600 }}>
          <AboutApp />
        </MediaQuery>

        <Divider />
        <AboutFunctions />
      </div>
    );
  }
}

export default Main;
