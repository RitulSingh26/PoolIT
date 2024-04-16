import React ,{useState} from 'react';
import { Link } from 'react-router-dom'; 
import './signup.css';
import axios from 'axios';

const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSignup = async() => {
        
        try {
            console.log("formdata",formData)
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log("res",response);
            if (response.status === 201) {
                window.location.href = '/login'; 
            }
        } catch (error) {
            console.error('Error signing up:', error);
        
        }
    };

    return (
        <>
            <div className="signup-page">
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                <div className="form">
                    <form className='signup-form'>
                        <input type="text" name="name" placeholder='Username' value={formData.name} onChange={handleChange}/>
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
                        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange}/>
                        <button type="button" onClick={handleSignup}>Sign Up</button>

                        <p className='message'>
                            Already Registered? <Link to="/login">Login</Link> 
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
