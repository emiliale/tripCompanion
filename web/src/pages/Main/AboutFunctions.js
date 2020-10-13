import React from "react";
import { Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

class AboutFunctions extends React.Component {
  render() {
    return (
      <div style={{ paddingRight: "5%", paddingLeft: "5%" }}>
        <Row align="middle" style={{ backgroundColor: "#fffceb" }}>
          <Col span={24} style={{ textAlign: "center" }}>
            <Title>Planuj wygodnie i szybko</Title>
            <Paragraph>
              Dzięki Trip Comanion planowanie podróży przestanie być ciężkim
              zadaniem i stanie się przyjemnością
            </Paragraph>
            <Row>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <img
                  width={150}
                  height={105}
                  alt="logo"
                  src="/img/map.png"
                  size={"100%"}
                />
                <Title level={3}>Stwórz swój własny City Tour</Title>
                <Paragraph>
                  Wybierz atrakcje, które chcesz odwiedzić w poszczególnych
                  dniach podróży i zobacz trasę, którą musisz pokonać.
                </Paragraph>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <img
                  width={150}
                  height={105}
                  alt="logo"
                  src="/img/suitcase.png"
                  size={"100%"}
                />
                <Title level={3}>Dziel podróże ze znajomymi</Title>
                <Paragraph>
                  Zaproś znajomych, z kótrymi podróżujesz i dziel się z nimi trasami oraz stworzonymi notatkami do nich.
                </Paragraph>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <img
                  width={150}
                  height={105}
                  alt="logo"
                  src="/img/wallet.png"
                  size={"100%"}
                />
                <Title level={3}>Przechowuj historię swoich podóży</Title>
                <Paragraph>
                  Sprawdź na mapie, jakie miejsca udało Ci się odwiedić
                  dotychcza oraz przyjrzyj się statystyką z Twoich wypraw.
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AboutFunctions;
