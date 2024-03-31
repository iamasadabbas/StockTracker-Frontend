import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./axiosInstance";
import axios from 'axios';
const URL = process.env.BASE_URL;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleForgetClick = () => {
        navigate('/forgetpassword');
    };

    const handleLogOut = () => {
        let config = {
            headers: { 'Content-Type': 'application/json' },
        };
        axiosInstance.get(`${URL}/user/logout`, config)
            .then(() => {
                const itemsToRemove = ['loggedIn', 'role', 'userId', 'bookId', 'bookmarkedPage', 'url'];

                for (const item of itemsToRemove) {
                    localStorage.removeItem(item);
                }
                // setLogin(false);
                navigate('/profile');
            })
            .catch(error => console.error('Logout failed:', error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await axios.post(`${URL}/user/loginUser`, { email, password });
            console.log(response);
            if (response.data.success ==true) {
                alert('Login successful');
                setEmail('');
                setPassword('');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className='body'>
            <div className="container">
            <h1 className='heading'>Login</h1>
                    <>
                        <form onSubmit={handleSubmit}>
                            <input className='input' value={email} onChange={handleUsernameChange} placeholder='Enter your email' />
                            <input className='input' type='password' value={password} onChange={handlePasswordChange} placeholder='Enter your password' />
                         <p><a className='forget-link' onClick={handleForgetClick}>Forget Password?</a></p>
                            <button className='button' type='submit'>Log in</button>
                        </form>
                        <p className='paragraph'>Don't have an account? <a className='signup-link' onClick={handleSignUpClick}>Sign up</a></p>
                    </>
                
                    {/* <button className='login-button' onClick={handleLogOut}>Log Out</button> */}
                
                {error && <div className="error-message" >{typeof error === 'object' ? JSON.stringify(error) : error}</div>}
            </div>
        </div>
    );
}
