import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Divider, Space, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { getCityTours, deleteCityTour } from "../../store/actions/cityTours";
import { Popconfirm } from "antd";
import NoAccess from "../../components/NoAccess";
import CityToursTemplates from "./components/CityToursTemplates";
import { withTranslation } from "react-i18next";

const { Title } = Typography;

class CityTours extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    this.props.getCityTours();
  }

  render() {
    const { t } = this.props;
    const columns = [
      {
        title: t("common.name"),
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Button
            type="link"
            onClick={() =>
              this.props.history.push("/city_tours/" + record.id + "/")
            }
          >
            {" "}
            <a>{text}</a>
          </Button>
        ),
      },
      {
        title: t("common.date"),
        dataIndex: "date",
        key: "date",
      },
      {
        title: t("tour.city"),
        dataIndex: "city",
        key: "city",
      },
      {
        title: t("tour.distanceMeters"),
        dataIndex: "distance",
        key: "distance",
      },
      {
        title: t("tour.action"),
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Button
              onClick={() =>
                this.props.history.push("/city_tours/" + record.id + "/")
              }
            >
              {" "}
              <a>{t("actions.edit")}</a>
            </Button>
            <Popconfirm
              title="Are you sure delete this tour?"
              onConfirm={() => this.props.deleteCityTour(record.id)}
              onCancel={() => console.log("cancel")}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <a>{t("buttons.delete")}</a>
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return localStorage.getItem("userId") ? (
      <div>
        <Title style={{ textAlign: "center" }}>{t("tour.suggested")}</Title>
        <CityToursTemplates />
        <Divider />
        <Title style={{ textAlign: "center" }}>{t("tour.yourTours")}</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button style={{ float: "right" }}>
            <Link to="/city_tours_new/" style={{ textDecoration: "none" }}>
              <PlusOutlined />
            </Link>
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={this.props.cityTours}
          loading={this.props.isLoading}
        />
      </div>
    ) : (
      <NoAccess />
    );
  }
}

const mapStateToProps = (state) => {
  const userId = parseInt(localStorage.getItem("userId"));
  return {
    isLoading: state.request.isLoading,
    cityTours: state.cityTours.filter(
      (tour) => tour.users.indexOf(userId) !== -1
    ),
  };
};

const mapDispatchToProps = {
  getCityTours,
  deleteCityTour,
};

export default withRouter(
  withTranslation()(connect(mapStateToProps, mapDispatchToProps)(CityTours))
);
