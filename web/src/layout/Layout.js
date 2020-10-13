import React from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import styles from "./layout.css";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout" style={{ backgroundColor: "#fffceb" }}>
        <Header style={{ backgroundColor: "#ffffff" }}>
          <div className="logo" />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
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
                  src="https://www.iconsdb.com/icons/preview/orange/briefcase-xxl.png"
                />
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/">
                <Typography>Trip Companion</Typography>
              </Link>
            </Menu.Item>
            {this.props.isAuthenticated ? (
              <>
                <Menu.Item key="3">
                  <Link to="/trips/">Podróże</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/city_tours/">CityToury</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/map/">Mapa</Link>
                </Menu.Item>

                <SubMenu
                  style={{ float: "right" }}
                  key="sub1"
                  title={
                    <span>
                      <UserOutlined />
                      Konto
                    </span>
                  }
                >
                  <Menu.Item key="7">
                    <Link to="/change_password/">Zmień hasło</Link>
                  </Menu.Item>
                  <Menu.Item key="9" onClick={this.props.logout}>
                    Wyloguj
                  </Menu.Item>
                </SubMenu>
              </>
            ) : (
              <>
                <Menu.Item key="10">
                  <Link to="/functions/">Funkcje</Link>
                </Menu.Item>

                <Menu.Item style={{ float: "right" }} key="11">
                  <Link to="/login/">Zaloguj się</Link>
                </Menu.Item>

                <Menu.Item style={{ float: "right" }} key="12">
                  <Link to="/signup/">Zarejestruj</Link>
                </Menu.Item>
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
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
