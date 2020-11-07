import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Modal, Form, Input, DatePicker } from "antd";
import { newTrip } from "../../../store/actions/trips";
import { format } from "date-fns";

const { RangePicker } = DatePicker;

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

class _Modal extends React.Component {
  state = {
    visible: this.props.open,
  };

  formRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open) {
      this.setState({ visible: this.props.open });
    }
  }

  getUser(username) {
    axios
      .get(`${serverUrl}/administration/users/?username=${username}`)
      .then((res) => {
        res.data.map((user) => user.id);
        console.log(res.data.map((user) => user.id));
        return res.data;
      });
  }

  onFinish = (values) => {
    let users = [parseInt(localStorage.getItem("userId"))];
    this.props.newTrip(
      values.name,
      format(values.date[0]._d, "yyyy-MM-dd"),
      format(values.date[1]._d, "yyyy-MM-dd"),
      users
    );  
    this.setState({
      visible: false,
    });
    this.formRef.current.resetFields();
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render = () => {
    return (
      <Modal
        afterClose={this.props.afterClose}
        title="New Trip"
        visible={this.state.visible}
        okButtonProps={{
          form: "category-editor-form",
          key: "submit",
          htmlType: "submit",
        }}
        onCancel={this.handleCancel}
      >
        <Form
          ref={this.formRef}
          id="category-editor-form"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Please input date!" }]}
          >
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = {
  newTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(_Modal);
