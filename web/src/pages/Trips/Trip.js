import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Space,
  Table,
  Form,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { FastBackwardOutlined, PlusOutlined } from "@ant-design/icons";
import { getTrips, newTrip, deleteTrip } from "../../store/actions/trips";
import { getCityTours, deleteCityTour } from "../../store/actions/cityTours";
import { getUsers } from "../../store/actions/users";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import Users from "./components/Users";
import NoAccess from "../../components/NoAccess";

const { Title } = Typography;
const { RangePicker } = DatePicker;

class Trip extends React.Component {
  formRef = React.createRef();

  state = {
    editable: false,
  };

  componentDidMount() {
    this.props.getTrips();
    this.props.getCityTours();
  }

  onFinish = (values) => {
    this.props.updateTrip(
      this.props.trip.id,
      values.name,
      moment(values.date[0]._d).format("YYYY-MM-DD"),
      moment(values.date[1]._d).format("YYYY-MM-DD"),
      this.props.trip.users
    );
    this.setState({
      visible: false,
    });
    this.formRef.current.resetFields();
    this.setState({ editable: false });
  };

  deleteTrip() {
    this.props.deleteTrip(this.props.trip.id);
    this.props.history.push("/trips");
    window.location.reload(false);
  }

  render() {
    const columnsUsers = [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "First name",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Last name",
        dataIndex: "last_name",
        key: "last_name",
      },
    ];
    const columnsTours = [
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
    return localStorage.getItem("userId") ? (
      <div>
        <Title>{this.props.trip ? this.props.trip.name : "Podróż"}</Title>
        <Divider />
        <Row align="middle">
          <Col span={12} style={{ textAlign: "center" }}>
            <img
              width={400}
              height={300}
              alt="logo"
              src="/img/7139.jpg"
              size={"100%"}
            />
          </Col>
          <Col span={12}>
            {this.state.editable ? (
              <div>
                <Form
                  ref={this.formRef}
                  id="category-editor-form"
                  onFinish={this.onFinish}
                  initialValues={{
                    ["name"]: this.props.trip ? this.props.trip.name : null,
                    ["date"]: this.props.trip
                      ? [
                          moment(this.props.trip.start_date),
                          moment(this.props.trip.end_date),
                        ]
                      : null,
                  }}
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please input name!" }]}
                  >
                    <Input name="name" placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    name="date"
                    rules={[{ required: true, message: "Please input date!" }]}
                  >
                    <RangePicker name="date" />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    onClick={() => this.setState({ editable: false })}
                    style={{ marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                </Form>
              </div>
            ) : (
              <div>
                <Row gutter={16}>
                  <Col span={24}>
                    <Popconfirm
                      title="Are you sure delete this trip?"
                      onConfirm={() => this.deleteTrip()}
                      onCancel={() => console.log("cancel")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ float: "right" }}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Popconfirm>
                    <Button
                      style={{ float: "right" }}
                      onClick={() => this.setState({ editable: true })}
                      icon={<EditOutlined />}
                    ></Button>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <div>
                      <p>
                        <b>Name:</b>
                      </p>
                    </div>
                  </Col>
                  <Col span={14}>
                    <div>{this.props.trip ? this.props.trip.name : ""}</div>
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
                    <div>
                      {this.props.trip ? this.props.trip.start_date : ""}
                    </div>
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
                    <div>{this.props.trip ? this.props.trip.end_date : ""}</div>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
        <Divider />
        <Title level={2}>City Toury</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button style={{ float: "right" }}>
            <Link to="/city_tours_new/" style={{ textDecoration: "none" }}>
              <PlusOutlined />
            </Link>
          </Button>
        </Space>
        <Table
          columns={columnsTours}
          dataSource={this.props.cityTours}
          loading={this.props.isLoading}
        />
        <Divider />
        <Title level={2}>Users</Title>
        <Users trip={this.props.trip} />
      </div>
    ) : (
      <NoAccess />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const tripId = parseInt(ownProps.match.params.id);
  return {
    isLoading: state.request.isLoading,
    trip: state.trips.find((x) => x.id === tripId),
  };
};

const mapDispatchToProps = {
  getTrips,
  newTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
