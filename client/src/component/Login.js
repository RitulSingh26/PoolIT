
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';




const Login = () => {
    const navigate = useNavigate();
    const { setUserData } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/userlogin', formData);
            if (response.status === 200) {
                setUserData(response.data);
                navigate("/upload");
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const loginwithgoogle = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");
    };

    const handleLogout = () => {
        localStorage.removeItem('loginTime');
        
    };


    useEffect(() => {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            const oneDayInMs = 24 * 60 * 60 * 1000;
            const currentTime = new Date().getTime();
            if (currentTime - parseInt(loginTime, 10) >= oneDayInMs) {
                handleLogout();
            }
        }
    }, []);

    return (
        <div className="login-page">
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className="form">
                <form className='login-form'>
                    <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                    <button type="button" onClick={handleLogin}>Login</button>
                    <p className='message'>Not Registered? <Link to="/signup">Sign Up</Link></p>
                </form>
                <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
