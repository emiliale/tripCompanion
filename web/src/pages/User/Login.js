import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

class Login extends React.Component {
  state = {
    isLoading: false,
  };

  onFinish = (values) => {
    this.setState({ isLoading: true });
    this.props.onAuth(values.username, values.password);
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div
        style={{ paddingRight: "30%", paddingLeft: "30%", paddingTop: "3%" }}
      >
        {errorMessage}
        {this.props.loading || this.state.isLoading ? (
          <Spin indicator={<LoadingOutlined />} />
        ) : (
          <Form onFinish={this.onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nazwa użytkownika"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Hasło" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Zaloguj
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
