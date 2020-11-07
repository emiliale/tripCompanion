import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Card, Row, Col, Divider } from "antd";
import { getTrips } from "../../store/actions/trips";

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
          location: `${trip.location}`,
          start: `${trip.start_date}`,
          end: `${trip.end_date}`,
        });
      });
      this.setState({ trips: list });
    }
  }

  render() {
    console.log(this.props.trips);
    return (
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
                      <b>Location:</b>
                    </p>
                  </div>
                </Col>
                <Col span={14}>
                  <div>{item.location}</div>
                </Col>
              </Row>
              <Divider style={{ marginTop: "1px" }} />
              <Row gutter={16}>
                <Col span={10}>
                  <div>
                    <p>
                      <b>Start:</b>
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
                      <b>End:</b>
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
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = {
  getTrips,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OldTrips)
);
