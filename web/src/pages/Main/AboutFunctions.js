import React from "react";
import { Typography, Row, Col } from "antd";
import { withTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

class AboutFunctions extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Row align="middle" style={{ backgroundColor: "#fffceb" }}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Title>{t("main.planTrip")}</Title>
            <Paragraph>{t("main.mainDescription")}</Paragraph>
            <Row>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <img
                  width={150}
                  height={105}
                  alt="logo"
                  src="/img/main (1).jpg"
                  size={"100%"}
                />
                <Title level={3}>{t("functions.createTour")}</Title>
                <Paragraph>{t("main.createTourShortDescription")}</Paragraph>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <img
                  width={150}
                  height={105}
                  alt="logo"
                  src="/img/main (3).jpg"
                  size={"100%"}
                />
                <Title level={3}>{t("functions.shareWithFriends")}</Title>
                <Paragraph>
                  {t("main.shareWithFriendsShortDescription")}
                </Paragraph>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <img
                  width={150}
                  height={105}
                  alt="logo"
                  src="/img/main (2).jpg"
                  size={"100%"}
                />
                <Title level={3}>{t("functions.history")}</Title>
                <Paragraph>{t("main.historyShortDescription")}</Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(AboutFunctions);
