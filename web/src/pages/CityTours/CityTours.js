import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { getCityTours, deleteCityTour } from "../../store/actions/cityTours";
import { Popconfirm } from "antd";

class CityTours extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    this.props.getCityTours();
  }

  render() {
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
