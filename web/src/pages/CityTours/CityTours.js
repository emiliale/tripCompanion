import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Typography, Divider, Button, Space, Table, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { getTrips, updateTrip, deleteTrip } from "../../store/actions/trips";
import { getCityTours, deleteCityTour } from "../../store/actions/cityTours";
import { Popconfirm, message } from "antd";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

class CityTours extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    this.props.getCityTours();
  }

  render() {
    console.log(this.props.cityTours);
    const columns = [
      {
        title: "Name",
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
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Distance",
        dataIndex: "distance",
        key: "distance",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Button
              onClick={() =>
                this.props.history.push("/city_tours/" + record.id + "/")
              }
            >
              {" "}
              <a>Edit</a>
            </Button>
            <Popconfirm
              title="Are you sure delete this tour?"
              onConfirm={() => this.props.deleteCityTour(record.id)}
              onCancel={() => console.log("cancel")}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <a>Delete</a>
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Button style={{ float: "right" }}>
            <Link to="/city_tours_new/" style={{ textDecoration: "none" }}>
              <PlusOutlined />
            </Link>
          </Button>
        </Space>
        <Table columns={columns} dataSource={this.props.cityTours} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = parseInt(localStorage.getItem("userId"));
  return {
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
  connect(mapStateToProps, mapDispatchToProps)(CityTours)
);
