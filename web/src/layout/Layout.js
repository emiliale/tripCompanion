import React from 'react';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header style={{ backgroundColor: "#fffceb" }}>
                    <div className="logo" />
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', backgroundColor: "#fffceb" }}
                    >
                        <Menu.Item key="1">
                            <Link to="/">
                                <img
                                    width={60}
                                    height={50}
                                    alt="logo"
                                    src="https://www.iconsdb.com/icons/preview/orange/briefcase-xxl.png" />

                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/">
                                <Typography >Trip Companion</Typography >
                            </Link>
                        </Menu.Item>
                        {this.props.isAuthenticated ? (
                            <>
                                <Menu.Item key="3">
                                    <Link to="/">Podróże</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/">CityToury</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/">Mapa</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/">Kalkulator kosztów</Link>
                                </Menu.Item>

                                <SubMenu style={{ float: 'right' }}
                                    key="sub1"
                                    title={
                                        <span>
                                            <UserOutlined />
                                         Konto
                                        </span>
                                    }
                                >
                                    <Menu.Item key="7" ><Link to="/">Zmień hasło</Link></Menu.Item>
                                    <Menu.Item key="9" onClick={this.props.logout}>Wyloguj</Menu.Item>
                                </SubMenu>
                            </>
                        ) : (
                                <>
                                    <Menu.Item key="10">
                                        <Link to="/">Funkcje</Link>
                                    </Menu.Item>

                                    <Menu.Item style={{ float: 'right' }} key="11"  >
                                        <Link to="/login">Zaloguj się</Link>
                                    </Menu.Item>

                                    <Menu.Item style={{ float: 'right' }} key="12"  >
                                        <Link to="/">Zarejestruj</Link>
                                    </Menu.Item>
                                </>
                            )}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/main">Strona Główna</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Tutaj</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                </Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));