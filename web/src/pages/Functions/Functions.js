import React from "react";
import { Typography, Divider } from "antd";
import Function from "./Function";
import { withTranslation } from "react-i18next";

const { Title } = Typography;

class Functions extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Title style={{ textAlign: "center" }}>{t("functions.offer")}</Title>
        <Divider />
        <Function
          img={"/img/7881.jpg"}
          title={t("functions.createTour")}
          text={t("functions.createTourDescription")}
        />
        <Divider />
        <Function
          img={"/img/5556.jpg"}
          title={t("functions.shareWithFriends")}
          text={t("functions.shareWithFriendsDescription")}
        />
        <Divider />
        <Function
          img={"/img/6595.jpg"}
          title={t("functions.history")}
          text={t("functions.historyDescription")}
        />
      </div>
    );
  }
}

export default withTranslation()(Functions);
