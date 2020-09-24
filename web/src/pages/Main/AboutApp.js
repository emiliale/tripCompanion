import React from 'react';
import { Typography, Row, Col, Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';


const { Title, Paragraph } = Typography;

class AboutApp extends React.Component {
    render() {
        return (
            <div style={{ paddingRight: '5%', paddingLeft: '5%' }}>
                <Row align="middle">
                    <Col span={12}>
                        <Carousel autoplay>
                            <div>
                                <img
                                    width={700}
                                    height={550}
                                    alt="logo"
                                    src="/img/64678.jpg"
                                    size={'100%'}
                                />
                            </div>
                            <div>
                                <img
                                    width={700}
                                    height={550}
                                    alt="logo"
                                    src="/img/64662.jpg"
                                    size={'100%'}
                                />
                            </div>
                            <div>
                                <img
                                    width={700}
                                    height={550}
                                    alt="logo"
                                    src="/img/66143.jpg"
                                    size={'100%'}
                                />
                            </div>
                        </Carousel>
                    </Col>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <Title>
                            Zaplanuj podróż z Trip Companion!
                        </Title>
                        <Paragraph>
                            Wybierz atrakcje, które chcesz odwiedzić, stwórz trasę pomiędzy nimi,
                            a następnie podlicz koszty, wliczając bielty wstępu, noclegi oraz transport!
                        </Paragraph>
                        <Button style={{ backgroundColor: "#f5b642", marginRight: "5%" }}><Link to="/signup/" style={{ textDecoration: 'none' }}>Zarejestruj się</Link></Button>
                        <Button><Link to="/functions/" style={{ textDecoration: 'none' }}>Wiecej</Link></Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AboutApp;