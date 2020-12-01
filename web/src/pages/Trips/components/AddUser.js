import React from "react";
import { connect } from "react-redux";
import { Modal, Form, AutoComplete } from "antd";
import { updateTrip } from "../../../store/actions/trips";
import { getUsers } from "../../../store/actions/users";
import { withTranslation } from "react-i18next";

class AddUser extends React.Component {
  state = {
    visible: this.props.open,
    options: [],
    user: "",
  };

  formRef = React.createRef();

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open) {
      this.setState({ visible: this.props.open });
    }
  }

  onSearch = (searchText) => {
    let userId = parseInt(localStorage.getItem("userId"));
    let options = this.props.users;
    options = options.map((user) => {
      return { value: user.username };
    });
    this.setState({ options: !searchText ? [] : options });
  };

  onSelect = (data) => {
    const user = this.props.users.find((x) => x.username === data);
    this.setState({ user: user.id });
  };

  onFinish = (values) => {
    let users = this.props.trip.users;
    users.push(this.state.user);
    this.props.updateTrip(
      this.props.trip.id,
      this.props.trip.name,
      this.props.trip.start_date,
      this.props.trip.end_date,
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
    const { t } = this.props;
    return (
      <Modal
        afterClose={this.props.afterClose}
        title="Add user to the trip"
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
          <AutoComplete
            options={this.state.options}
            style={{
              width: 200,
            }}
            onSelect={this.onSelect}
            onSearch={this.onSearch}
            placeholder={t("trip.username")}
          />
        </Form>
      </Modal>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = {
  getUsers,
  updateTrip,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddUser)
);
