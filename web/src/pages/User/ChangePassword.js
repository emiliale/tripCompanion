import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { LockOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

class ChangePassword extends React.Component {
  onFinish = (values) => {
    this.props.onAuth(values.password, values.confirm, values.oldPassword);
  };

  render() {
    const { t } = this.props;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage =
        this.props.error.message === "Request failed with status code 400"
          ? t("user.wrongPassword")
          : this.props.error.message;
    }
    return (
      <div style={{ paddingRight: "30%", paddingLeft: "30%" }}>
        <Typography>{errorMessage}</Typography>
        <Divider />
        <Form onFinish={this.onFinish}>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: t("user.inputCurrentPassword"),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("user.currentPassword")}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("user.inputNewPassword"),
              },
              () => ({
                validator(rule, value) {
                  if (!value || value.length >= 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t("user.passwordValidate"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("user.newPassword")}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("user.confirmPassword"),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(t("user.passwordMatch"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("user.cofirmPasswordPlaceholder")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              {t("user.changePassword")}
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

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
