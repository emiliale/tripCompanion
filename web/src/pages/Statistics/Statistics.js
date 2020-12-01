import React from "react";

import { Tabs } from "antd";
import UserStatistics from "./UserStatistics";
import AllUsersStatistics from "./AllUsersStatistics";
import NoAccess from "../../components/NoAccess";
import { withTranslation } from "react-i18next";

import { Typography } from "antd";
const { Title } = Typography;

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const Statistics = (props) =>
  localStorage.getItem("userId") ? (
    <div>
      <Title>{props.t("menu.statistics")}</Title>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab={props.t("statistics.yourStatistics")} key="1">
          <UserStatistics />
        </TabPane>
        <TabPane tab={props.t("statistics.allStatistics")} key="2">
          <AllUsersStatistics />
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <NoAccess />
  );

export default withTranslation()(Statistics);
