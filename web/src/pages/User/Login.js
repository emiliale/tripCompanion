import React from "react";
import { Form, Input, Button, Spin, Typography, Divider } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";

class Login extends React.Component {
  onFinish = (values) => {
    this.props.onAuth(values.username, values.password);
  };

  render() {
    const { t } = this.props;
    let errorMessage = null;
    if (this.props.error) {
      errorMessage =
        this.props.error.message === "Request failed with status code 400"
          ? t("user.wrongLogin")
          : this.props.error.message;
    }
    return (
      <div
        style={{ paddingRight: "30%", paddingLeft: "30%", paddingTop: "3%" }}
      >
        <Typography>{errorMessage}</Typography>
        <Divider />
        {this.props.loading ? (
          <Spin indicator={<LoadingOutlined />} />
        ) : (
          <Form onFinish={this.onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[{ required: true, message: t("user.inputUsername") }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t("user.username")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: t("user.inputPassword") }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t("user.password")}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                {t("user.login")}
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
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
