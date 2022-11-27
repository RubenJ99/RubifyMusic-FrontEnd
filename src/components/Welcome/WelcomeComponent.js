
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WelcomeComponent = () => {
    return (
        <div>
            <h1>Welcome</h1>
           <Link to="/login">
            <button>Log In</button>
           </Link>
        </div>
    );
};

export default WelcomeComponent;