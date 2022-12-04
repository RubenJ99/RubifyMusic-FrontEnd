import React from 'react';
import DefaultNavbarComponent from './DefaultNavbar/DefaultNavbarComponent';

const DefaultDashboardComponent = () => {
    return (
        <div>
            <DefaultNavbarComponent />
            <h1>Welcome default user</h1>
        </div>
    );
};

export default DefaultDashboardComponent;