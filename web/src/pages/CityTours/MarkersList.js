import React from 'react';
import { Table, Space, Input, Divider } from 'antd';
const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
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
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Park',
    distance: '10km',
  },
  {
    key: '2',
    name: 'Museum',
    distance: '12km',
  },
  {
    key: '3',
    name: 'Church',
    distance: '6km',
  },
  {
    key: '4',
    name: 'Museum',
    distance: '6km',
  },
  {
    key: '5',
    name: 'Museum',
    distance: '6km',
  },
  {
    key: '6',
    name: 'Museum',
    distance: '6km',
  },
  {
    key: '7',
    name: 'Museum',
    distance: '6km',
  },
];

class MarkersList extends React.Component {
  render() {
    return (
      <div >
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4,
          }}
        />
      </div>
    );
  }
}

export default MarkersList;