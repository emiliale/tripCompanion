import React from 'react';
import { withRouter } from "react-router-dom"
import { List, Card } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}


class OldTrips extends React.Component {
    render() {
        return (
            <List
                itemLayout="horizontal"
                grid={{ gutter: 16, column: 4 }}
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize:4,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                    onClick={item => {this.props.history.push("/trips/"+ item.key + "/")}}
                    >
                        <Card title={item.title}>Card content</Card>
                    </List.Item>
                )}
                />
        )}
}

    export default withRouter(OldTrips);