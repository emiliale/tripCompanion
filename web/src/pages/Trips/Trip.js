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
import { PlusOutlined } from "@ant-design/icons";
import { getTrips, updateTrip, deleteTrip } from "../../store/actions/trips";
import { getCityTours, deleteCityTour } from "../../store/actions/cityTours";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

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
      <div style={{ paddingRight: "5%", paddingLeft: "5%" }}>
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
        <Table columns={columns} dataSource={this.props.cityTours} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const tripId = parseInt(ownProps.match.params.id);
  return {
    trip: state.trips.find((x) => x.id === tripId),
    cityTours: state.cityTours.filter((tour) => {
      return tour.trip ? tour.trip === tripId : false;
    }),
  };
};

const mapDispatchToProps = {
  getTrips,
  updateTrip,
  deleteTrip,
  getCityTours,
  deleteCityTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
