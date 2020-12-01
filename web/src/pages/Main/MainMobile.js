import React from "react";
import { Typography, Row, Col, Button, Carousel } from "antd";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

class MainMobile extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Title>{t("main.planTrip")}</Title>
        <Paragraph>{t("main.mainDescription")}</Paragraph>
        <Row align="middle">
          {localStorage.getItem("userId") ? null : (
            <Col span={12}>
              <Button style={{ backgroundColor: "#f5b642", marginRight: "5%" }}>
                <Link to="/signup/" style={{ textDecoration: "none" }}>
                  {t("menu.signin")}
                </Link>
              </Button>
            </Col>
          )}
          <Col span={12} style={{ textAlign: "center" }}>
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

export default withTranslation()(MainMobile);
