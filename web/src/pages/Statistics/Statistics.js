import React from "react";

import { Tabs } from "antd";
import UserStatistics from "./UserStatistics";
import AllUsersStatistics from "./AllUsersStatistics";

import {
  Typography,
  Divider,
  Table,
  DatePicker,
  Row,
  Col,
  PageHeader,
} from "antd";
const { Title, Paragraph } = Typography;

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const Statistics = () => (
  <div>
    <Title>Statistics</Title>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Yours statistics" key="1">
        <UserStatistics />
      </TabPane>
      <TabPane tab="All users statistics" key="2">
        <AllUsersStatistics />
      </TabPane>
    </Tabs>
  </div>
);

export default Statistics;
