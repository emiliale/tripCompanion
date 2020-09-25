import React from 'react';
import { Typography, Row, Col, Divider, Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: 'Distance',
        dataIndex: 'distance',
        key: 'distance',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'New York first day',
        date: '01-02-2019',
        city: 'New York',
        distance: '10km',
    },
    {
        key: '2',
        name: 'New York second day',
        date: '02-02-2019',
        city: 'New York',
        distance: '12km',
    }
];

class NewCityTour extends React.Component {
    render() {
        return (
            <div >
                <Title>{this.props.trip ? this.props.trip.name : "Podróż"}</Title>
                <Divider />
                <Row align="middle">
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <img
                            width={400}
                            height={300}
                            alt="logo"
                            src="/img/7139.jpg"
                            size={'100%'}
                        />
                    </Col>
                    <Col span={12} >
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
                            <Paragraph>
                                {"Koszt: "}
                                <b>{this.props.trip ? this.props.trip.price + "zł" : "0 zł"}</b>
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
                <Divider />
                <Title level={2}>Kalkulator kosztów</Title>
                <Paragraph>
                    {"Transport: "}
                    <b>{this.props.trip ? this.props.trip.name : "0 zł"}</b>
                </Paragraph>
                <Paragraph>
                    {"Nocleg: "}
                    <b>{this.props.trip ? this.props.trip.name : "0 zł"}</b>
                </Paragraph>
                <Paragraph>
                    {"Bilety wstępu: "}
                    <b>{this.props.trip ? this.props.trip.name : "0 zł"}</b>
                </Paragraph>
                <Button style={{ marginBottom: '20px' }}><Link to="/city_tours_new/" style={{ textDecoration: 'none' }}>Edytuj koszt podróży</Link></Button>
                <Divider />
                <Title level={2}>City Toury</Title>
                <Space style={{ marginBottom: 16 }}>
                    <Button style={{ float: 'right' }}><Link to="/city_tours_new/" style={{ textDecoration: 'none' }}><PlusOutlined /></Link></Button>
                </Space>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default NewCityTour;