import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { LockOutlined } from "@ant-design/icons";

class ChangePassword extends React.Component {
  onFinish = (values) => {
    this.props.onAuth(values.password, values.confirm, values.oldPassword);
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message === "Request failed with status code 400" ? "Niepoprawne hasło" : this.props.error.message
    }
    return (
      <div style={{ paddingRight: "30%", paddingLeft: "30%" }}>
        <Typography>{errorMessage}</Typography>
        <Divider/>
        <Form onFinish={this.onFinish}>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Current password"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              () => ({
                validator(rule, value) {
                  if (!value || value.length >= 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Password must be a minimum of 6 characters!"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Change password
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (password1, password2, oldPassword, token) =>
      dispatch(
        actions.authChangePassword(password1, password2, oldPassword, token)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
