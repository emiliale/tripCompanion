import React from "react";
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
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "New York first day",
    date: "01-02-2019",
    city: "New York",
    distance: "10km",
  },
  {
    key: "2",
    name: "New York second day",
    date: "02-02-2019",
    city: "New York",
    distance: "12km",
  },
];

class NewCityTour extends React.Component {
  formRef = React.createRef();

  state = {
    editable: false,
  };

  onFinish = (values) => {
    console.log(values);
    console.log(values.date[0]._d);
    this.setState({
      visible: false,
    });
    this.formRef.current.resetFields();
    this.setState({ editable: false });
  };

  render() {
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
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please input name!" }]}
                  >
                    <Input
                      placeholder="Name"
                      defaultValue={
                        this.props.trip ? this.props.trip.name : null
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="location"
                    rules={[
                      { required: true, message: "Please input location!" },
                    ]}
                  >
                    <Input
                      placeholder="Location"
                      defaultValue={
                        this.props.trip ? this.props.trip.location : null
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="date"
                    rules={[{ required: true, message: "Please input date!" }]}
                  >
                    <RangePicker
                      defaultValue={
                        this.props.trip
                          ? [this.props.trip.date_from, this.props.trip.date_to]
                          : null
                      }
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            ) : (
              <div>
                <Paragraph>
                  {"Nazwa podróży: "}
                  <b>{this.props.trip ? this.props.trip.name : "nazwa"}</b>
                </Paragraph>
                <Paragraph>
                  {"Lokalizacja: "}
                  <b>
                    {this.props.trip ? this.props.trip.location : "lokalizacja"}
                  </b>
                </Paragraph>
                <Paragraph>
                  {"Od: "}
                  <b>
                    {this.props.trip ? this.props.trip.name : "01-02-2020 \t"}
                  </b>
                  {"Do: "}
                  <b>{this.props.trip ? this.props.trip.name : "09-02-2020"}</b>
                </Paragraph>
                <Paragraph>
                  {"Koszt: "}
                  <b>
                    {this.props.trip ? this.props.trip.price + "zł" : "0 zł"}
                  </b>
                </Paragraph>
              </div>
            )}
          </Col>
          {!this.state.editable ? (
            <Button
              style={{ float: "right" }}
              onClick={() => this.setState({ editable: true })}
            >
              Edytuj
            </Button>
          ) : null}
        </Row>
        <Divider />
        <Title level={2}>Kalkulator kosztów</Title>
        <Paragraph>
          {"Transport: "}
          <b>{this.props.trip ? this.props.trip.name : "0 zł"}</b>
        </Paragraph>
        <Paragraph>
          {"Nocleg: "}
          <b>{this.props.trip ? this.props.trip.name : "0 zł"}</b>
        </Paragraph>
        <Paragraph>
          {"Bilety wstępu: "}
          <b>{this.props.trip ? this.props.trip.name : "0 zł"}</b>
        </Paragraph>
        <Button style={{ marginBottom: "20px" }}>
          <Link to="/city_tours_new/" style={{ textDecoration: "none" }}>
            Edytuj koszt podróży
          </Link>
        </Button>
        <Divider />
        <Title level={2}>City Toury</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button style={{ float: "right" }}>
            <Link to="/city_tours_new/" style={{ textDecoration: "none" }}>
              <PlusOutlined />
            </Link>
          </Button>
        </Space>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default NewCityTour;
