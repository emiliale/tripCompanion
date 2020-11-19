import React from "react";
import { Typography, Row, Col, Button, Carousel } from "antd";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;

class NoAccess extends React.Component {
  render() {
    return (
      <div>
        <Title>
          <InfoCircleOutlined /> You have to login in to see this page
        </Title>
      </div>
    );
  }
}

export default NoAccess;
