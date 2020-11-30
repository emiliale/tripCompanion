import React from "react";
import { withTranslation } from "react-i18next";
import { Layout, Menu, Breadcrumb, Typography, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import "./layout.css";
import i18next from "i18next";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  handleClick() {
    const lang = localStorage.getItem("i18nextLng");
    switch (lang) {
      case "pl":
        i18next.changeLanguage("en");
        break;
      case "en":
        i18next.changeLanguage("pl");
        break;
      default:
        i18next.changeLanguage("en");
    }
  }

  langButton() {
    const lang = localStorage.getItem("i18nextLng");
    switch (lang) {
      case "pl":
        return <p>EN</p>;
        break;
      case "en":
        return <p>PL</p>;
        break;
      default:
        return <p>PL</p>;
    }
  }

  render() {
    let isAuth = localStorage.getItem("userId");
    const { t } = this.props;
    console.log(isAuth);
    return (
      <Layout className="layout" style={{ backgroundColor: "#fffceb" }}>
        <Header style={{ backgroundColor: "#ffffff" }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={isAuth ? ["3"] : ["2"]}
            style={{
              lineHeight: "64px",
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            <Menu.Item key="1">
              <Link to="/">
                <img
                  width={60}
                  height={50}
                  alt="logo"
                  src="/img/briefcase-xxl.png"
                />
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/">
                <Typography>Trip Companion</Typography>
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }} key="13">
              <Button type="text" onClick={() => this.handleClick()}>
                {this.langButton()}
              </Button>
            </Menu.Item>
            {!isAuth ? (
              <>
                <Menu.Item key="10">
                  <Link to="/functions/">{t("menu.functions")}</Link>
                </Menu.Item>

                <Menu.Item style={{ float: "right" }} key="11">
                  <Link to="/login/">{t("menu.login")}</Link>
                </Menu.Item>

                <Menu.Item style={{ float: "right" }} key="12">
                  <Link to="/signup/">{t("menu.signin")}</Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="3">
                  <Link to="/trips/">{t("menu.trips")}</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/city_tours/">{t("menu.cityTours")}</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/statistics/">{t("menu.statistics")}</Link>
                </Menu.Item>

                <SubMenu
                  style={{ float: "right" }}
                  key="sub1"
                  title={
                    <span>
                      <UserOutlined />
                      {t("menu.profile")}
                    </span>
                  }
                >
                  <Menu.Item key="7">
                    <Link to="/change_password/">
                      {t("menu.changePassword")}
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="9"
                    onClick={() => {
                      this.props.logout();
                      this.forceUpdate();
                    }}
                  >
                    {t("menu.logout")}
                  </Menu.Item>
                </SubMenu>
              </>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item><Link to="/main">Strona Główna</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Tutaj</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <p>Images sources: <a href="https://www.freepik.com/vectors/school">School vector created by pch.vector - www.freepik.com</a></p>
        </Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  withTranslation()(connect(null, mapDispatchToProps)(CustomLayout))
);
