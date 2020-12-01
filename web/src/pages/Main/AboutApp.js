import React from "react";
import { Typography, Row, Col, Button, Carousel } from "antd";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

class AboutApp extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Row align="middle">
          <Col span={12}>
            <Carousel autoplay>
              <div>
                <img
                  width={700}
                  height={550}
                  alt="logo"
                  src="/img/64678.jpg"
                  size={"100%"}
                />
              </div>
              <div>
                <img
                  width={700}
                  height={550}
                  alt="logo"
                  src="/img/64662.jpg"
                  size={"100%"}
                />
              </div>
              <div>
                <img
                  width={700}
                  height={550}
                  alt="logo"
                  src="/img/66143.jpg"
                  size={"100%"}
                />
              </div>
            </Carousel>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Title>{t("main.planTrip")}</Title>
            <Paragraph>{t("main.mainDescription")}</Paragraph>
            {localStorage.getItem("userId") ? null : (
              <Button style={{ backgroundColor: "#f5b642", marginRight: "5%" }}>
                <Link to="/signup/" style={{ textDecoration: "none" }}>
                  {t("menu.signin")}
                </Link>
              </Button>
            )}
            <Button>
              <Link to="/functions/" style={{ textDecoration: "none" }}>
                {t("main.more")}
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(AboutApp);
