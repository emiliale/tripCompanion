import React from "react";
import { Typography, Row, Col, Button } from "antd";
import NewTrip from "./NewTrip";
import { withTranslation } from "react-i18next";

const { Title } = Typography;

class MainTripPanel extends React.Component {
  state = {
    modalOpen: false,
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <Row align="middle">
          <Col span={12}>
            <img
              width={1100}
              height={400}
              alt="logo"
              src="/img/7437.jpg"
              size={"100%"}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <Title>{t("trip.planTrip")}</Title>
            <Button
              style={{ backgroundColor: "#f5b642", marginRight: "5%" }}
              onClick={() => this.setState({ modalOpen: true })}
            >
              {t("trip.newTrip")}
            </Button>
          </Col>
        </Row>
        <NewTrip
          open={this.state.modalOpen}
          afterClose={() => this.setState({ modalOpen: false })}
        />
      </div>
    );
  }
}

export default withTranslation()(MainTripPanel);
