import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import {
  LoadingOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { withTranslation } from "react-i18next";

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    disabled: false,
  };

  onFinish = (values) => {
    this.setState({ disabled: true });
    this.props.onAuth(
      values.userName,
      values.email,
      values.password,
      values.confirm
    );
    this.setState({ disabled: false });
  };

  render() {
    const { t } = this.props;
    return (
      <div
        style={{ paddingRight: "30%", paddingLeft: "30%", paddingTop: "3%" }}
      >
        {this.props.loading ? (
          <Spin indicator={<LoadingOutlined />} />
        ) : (
          <div>
            <Form onFinish={this.onFinish}>
              <FormItem
                name="userName"
                rules={[{ required: true, message: t("user.inputUsername") }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={t("user.username")}
                />
              </FormItem>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: t("user.validateEmail"),
                  },
                  {
                    required: true,
                    message: t("user.inputEmail"),
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder={t("user.email")}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("user.inputPassword"),
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
                  placeholder={t("user.password")}
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
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                  disabled={this.props.loading || this.state.disabled}
                >
                  {t("menu.signin")}
                </Button>
                {t("user.or")}
                <NavLink style={{ marginRight: "10px" }} to="/login/">
                  {" "}
                  {t("menu.login")}
                </NavLink>
              </FormItem>
            </Form>
          </div>
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
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
);
