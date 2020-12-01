import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List, Card, Row, Col, Divider } from "antd";
import { getCityTourTemplates } from "../../../store/actions/cityToursTemplates";
import { Spin } from "antd";
import { withTranslation } from "react-i18next";

class CityToursTemplates extends React.Component {
  state = {
    tours: [],
  };

  componentDidMount() {
    this.props.getCityTourTemplates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cityTourTemplates !== prevProps.cityTourTemplates) {
      let list = [];
      this.props.cityTourTemplates.map((tour) => {
        list.push({
          id: `${tour.id}`,
          title: `${tour.name}`,
          city: `${tour.city}`,
          distance: `${tour.distance}`,
        });
      });
      this.setState({ tours: list });
    }
  }

  render() {
    const { t } = this.props;
    return this.props.isLoading ? (
      <Spin />
    ) : (
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 3 }}
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={this.state.tours}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              this.props.history.push("/city_tours/template/" + item.id + "/");
            }}
          >
            <Card hoverable title={item.title}>
              <Row gutter={16}>
                <Col span={10}>
                  <div>
                    <p>
                      <b>{t("tour.city")}</b>
                    </p>
                  </div>
                </Col>
                <Col span={14}>
                  <div>{item.city}</div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={10}>
                  <div>
                    <p>
                      <b>{t("tour.distance")}</b>
                    </p>
                  </div>
                </Col>
                <Col span={14}>
                  <div>{item.distance}</div>
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
    cityTourTemplates: state.cityTourTemplates,
  };
};

const mapDispatchToProps = {
  getCityTourTemplates,
};

export default withRouter(
  withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(CityToursTemplates)
  )
);
