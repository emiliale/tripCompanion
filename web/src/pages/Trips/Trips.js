import React from 'react';
import { Typography, Divider } from 'antd';
import NewTrip from './NewTrip';
import OldTrips from './OldTrips';


const { Title } = Typography;

class AboutApp extends React.Component {
    render() {
        return (
            <div>
                <NewTrip />
                <Divider />
                <Title style={{ textAlign: 'center' }}>Twoje podróże</Title>
                <OldTrips />
            </div>
        );
    }
}

export default AboutApp;