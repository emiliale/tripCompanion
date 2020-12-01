import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Card, Row, Col } from "antd";
import { getTrips } from "../../../store/actions/trips";
import { Spin } from "antd";
import { withTranslation } from "react-i18next";

class OldTrips extends React.Component {
  state = {
    trips: [],
  };

  componentDidMount() {
    this.props.getTrips();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.trips !== prevProps.trips) {
      let list = [];
      this.props.trips.map((trip) => {
        list.push({
          id: `${trip.id}`,
          title: `${trip.name}`,
          start: `${trip.start_date}`,
          end: `${trip.end_date}`,
        });
      });
      this.setState({ trips: list });
    }
  }

  render() {
    const { t } = this.props;
    return this.props.isLoading ? (
      <Spin />
    ) : (
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 4 }}
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={this.state.trips}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              this.props.history.push("/trips/" + item.id + "/");
            }}
          >
            <Card hoverable title={item.title}>
              <Row gutter={16}>
                <Col span={10}>
                  <div>
                    <p>
                      <b>{t("trip.start")}</b>
                    </p>
                  </div>
                </Col>
                <Col span={14}>
                  <div>{item.start}</div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={10}>
                  <div>
                    <p>
                      <b>{t("trip.end")}</b>
                    </p>
                  </div>
                </Col>
                <Col span={14}>
                  <div>{item.end}</div>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const userId = parseInt(localStorage.getItem("userId"));
  return {
    isLoading: state.request.isLoading,
    trips: state.trips.filter((trip) => trip.users.indexOf(userId) !== -1),
  };
};

const mapDispatchToProps = {
  getTrips,
};

export default withRouter(
  withTranslation()(connect(mapStateToProps, mapDispatchToProps)(OldTrips))
);
