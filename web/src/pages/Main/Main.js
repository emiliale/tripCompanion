import React from "react";
import { Divider } from "antd";
import AboutApp from "./AboutApp";
import AboutFunctions from "./AboutFunctions";
import MediaQuery from 'react-responsive';
import MainMobile from "./MainMobile";

class Main extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224}>
          <AboutApp />
          <Divider />
          <AboutFunctions />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MainMobile />
        </MediaQuery>
      </div>
    );
  }
}

export default Main;
