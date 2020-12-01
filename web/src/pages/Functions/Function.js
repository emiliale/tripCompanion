import React from "react";
import { Typography, Row, Col } from "antd";
import MediaQuery from "react-responsive";

const { Title, Paragraph } = Typography;

class Function extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224}>
          <Row align="middle" style={{ backgroundColor: "#fffceb" }}>
            <Col span={12}>
              <img
                width={700}
                height={500}
                alt="logo"
                src={this.props.img}
                size={"100%"}
              />
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <Title>{this.props.title}</Title>
              <Paragraph>{this.props.text}</Paragraph>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <Row align="middle" style={{ backgroundColor: "#fffceb" }}>
            <Title>{this.props.title}</Title>
            <Paragraph>{this.props.text}</Paragraph>
          </Row>
        </MediaQuery>
      </div>
    );
  }
}

export default Function;
