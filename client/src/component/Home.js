import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="content-box">
                <h1>Welcome to PoolIT</h1>
                <p>Want to convert your JSON file to CSV file</p>
                <p>You landed on a right page</p>
                <p>First signin to upload your file by clicking on the button below</p>
                <Link to="/login" className="upload-btn">Signin</Link>
            </div>
        </div>
    );
};

export default Home;
