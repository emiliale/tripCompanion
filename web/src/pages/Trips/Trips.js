import React from 'react';
import { Typography, Divider } from 'antd';
import MainTripPanel from './MainTripPanel';
import OldTrips from './OldTrips';


const { Title } = Typography;

class AboutApp extends React.Component {
    render() {
        return (
            <div>
                <MainTripPanel />
                <Divider />
                <Title style={{ textAlign: 'center' }}>Twoje podróże</Title>
                <OldTrips />
            </div>
        );
    }
}

export default AboutApp;