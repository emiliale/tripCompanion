import React from 'react';
import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

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
    title: 'Trip',
    dataIndex: 'trip',
    key: 'trip',
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
    trip: 'USA2020',
    trip: 'USA2020',
    distance: '10km',
  },
  {
    key: '2',
    name: 'New York second day',
    date: '02-02-2019',
    city: 'New York',
    trip: 'USA2020',
    distance: '12km',
  },
  {
    key: '3',
    name: 'Wroclaw',
    date: '11-11-2020',
    city: 'Wrocław',
    trip: 'Dolnyśląsk i okolice',
    distance: '6km',
  },
];

class CityTours extends React.Component {
  render() {
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
        <Button style={{float: 'right'}}><Link to="/city_tours_new/" style={{ textDecoration: 'none'}}><PlusOutlined  /></Link></Button>
        </Space>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default CityTours;
