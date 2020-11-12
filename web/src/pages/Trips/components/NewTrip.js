import React from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, DatePicker } from "antd";
import { newTrip } from "../../../store/actions/trips";
import { format } from "date-fns";

const { RangePicker } = DatePicker;

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
