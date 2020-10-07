import React from "react";
import { Typography, Row, Col, Divider, Button, Space, Card } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <Title>Kalkulator kosztów</Title>
        <Divider />
        <Row align="middle">
          <Col span={12}>
            {this.props.trip ? (
              <div>
                <Paragraph>
                  {"Nazwa podróży: "}
                  <b>{this.props.trip ? this.props.trip.name : "nazwa"}</b>
                </Paragraph>
                <Paragraph>
                  {"Od: "}
                  <b>
                    {this.props.trip ? this.props.trip.name : "01-02-2020 \t"}
                  </b>
                  {"Do: "}
                  <b>{this.props.trip ? this.props.trip.name : "09-02-2020"}</b>
                </Paragraph>
              </div>
            ) : (
              <div>
                <Button type="primary">
                  <Link
                    to="/city_tours_new/"
                    style={{ textDecoration: "none" }}
                  >
                    Dodaj do podróży
                  </Link>
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <Divider />
        <Row align="middle">
          <Col span={8} style={{ textAlign: "center" }}>
            <Card hoverable title="Transport">
              0 zł
            </Card>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Card hoverable title="Nocleg">
              0 zł
            </Card>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Card hoverable title="Bilety wstępu">
              0 zł
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Calculator;
