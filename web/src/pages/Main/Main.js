import React from "react";
import { Divider } from "antd";
import AboutApp from "./AboutApp";
import AboutFunctions from "./AboutFunctions";

class Main extends React.Component {
  render() {
    return (
      <div>
          <AboutApp />
        <Divider />
        <AboutFunctions />
      </div>
    );
  }
}

export default Main;
