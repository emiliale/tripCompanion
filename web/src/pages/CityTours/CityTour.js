import React from 'react';
import { Typography, Row, Col, Divider, Button } from 'antd';
import Map from './Map'
import MarkersList from './MarkersList'
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

class NewCityTour extends React.Component {
    render() {
        return (
            <div >
                <Title>Zaplanuj trasę</Title>
                <Divider />
                <Row align="middle">
                    <Col span={12} >
                        {this.props.trip ? (
                            <div>
                                <Paragraph>
                                    {"Nazwa podróży: "}
                                    <b>{this.props.trip ? this.props.trip.name : "nazwa"}</b>
                                </Paragraph>
                                <Paragraph>
                                    {"Od: "}
                                    <b>{this.props.trip ? this.props.trip.name : "01-02-2020 \t"}</b>
                                    {"Do: "}
                                    <b>{this.props.trip ? this.props.trip.name : "09-02-2020"}</b>
                                </Paragraph>
                            </div>
                        ) : (
                                <div>
                                    <Button type="primary"><Link to="/city_tours_new/" style={{ textDecoration: 'none' }}>Dodaj do podróży</Link></Button>
                                </div>
                            )}
                    </Col>
                </Row>
                <Divider />
                <Row align="middle">
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <Map />
                    </Col>
                    <Col span={12}>
                        <MarkersList />
                    </Col>
                </Row>
                <Button type="primary" style={{ float: 'right', marginBottom:'20px' }}><Link to="/city_tours_new/" style={{ textDecoration: 'none' }}>Stwórz City Tour</Link></Button>
            </div>
        );
    }
}

export default NewCityTour;