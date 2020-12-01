import React from "react";
import { Typography, Divider } from "antd";
import MainTripPanel from "./components/MainTripPanel";
import OldTrips from "./components/OldTrips";
import NoAccess from "../../components/NoAccess";
import { withTranslation } from "react-i18next";

const { Title } = Typography;

class Trips extends React.Component {
  render() {
    const { t } = this.props;
    return localStorage.getItem("userId") ? (
      <div>
        <MainTripPanel />
        <Divider />
        <Title style={{ textAlign: "center" }}>{t("trip.yourTrips")}</Title>
        <OldTrips />
      </div>
    ) : (
      <NoAccess />
    );
  }
}

export default withTranslation()(Trips);
