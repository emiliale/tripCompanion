import React from "react";
import { Typography, Row, Col, Button, Carousel } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;


class MainMobile extends React.Component {
    render() {
        return (
            <div>
                <Title level={3}>Zaplanuj podróż z Trip Companion!</Title>
                <Paragraph>
                    Wybierz atrakcje, które chcesz odwiedzić i stwórz trasę pomiędzy
                    nimi. Dziel się ze wszytskim ze znajomymi. Motywacją do odkrywania
                    świata będa przedstawiane statystki z podróży!
            </Paragraph>
                <Row align="middle">
                    {localStorage.getItem("userId") ? null : (
                        <Col span={12}>

                            <Button style={{ backgroundColor: "#f5b642", marginRight: "5%" }}>
                                <Link to="/signup/" style={{ textDecoration: "none" }}>
                                    Zarejestruj się
                                </Link>
                            </Button>
                        </Col>
                    )}
                    <Col span={12} style={{ textAlign: "center" }}>
                        <Button>
                            <Link to="/functions/" style={{ textDecoration: "none" }}>
                                Wiecej
                            </Link>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MainMobile;
