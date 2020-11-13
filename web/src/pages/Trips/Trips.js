import React from "react";
import { Typography, Divider } from "antd";
import MainTripPanel from "./components/MainTripPanel";
import OldTrips from "./components/OldTrips";
import NoAccess from "../../components/NoAccess";

const { Title } = Typography;

class AboutApp extends React.Component {
  render() {
    return localStorage.getItem("userId") ? (
      <div>
        <MainTripPanel />
        <Divider />
        <Title style={{ textAlign: "center" }}>Twoje podróże</Title>
        <OldTrips />
      </div>
    ) : (
      <NoAccess />
    );
  }
}

export default AboutApp;
