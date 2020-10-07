import React from "react";
import { Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

class Function extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
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
      </div>
    );
  }
}

export default Function;
