import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';


const { Title } = Typography;

class NewTrip extends React.Component {
    render() {
        return (
            <div>
                <Row align="middle">
                    <Col span={12}>
                        <img
                            width={1100}
                            height={400}
                            alt="logo"
                            src="/img/7437.jpg"
                            size={'100%'}
                        />
                    </Col>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <Title>
                            Zaplanuj kolejną podróż!
                        </Title>
                        <Button style={{ backgroundColor: "#f5b642", marginRight: "5%" }}><Link to="/tripnew/" style={{ textDecoration: 'none' }}>Nowa podróż</Link></Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NewTrip;