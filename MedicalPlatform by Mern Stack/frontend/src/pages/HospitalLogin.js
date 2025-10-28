import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function HospitalLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3055/hospital/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                const token = data.token;
                const userEmail = data.email;
                alert('Login successful');
                setEmail('');
                setPassword('');
                localStorage.setItem('token', token);
                navigate('/home', { state: { userEmail } });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log('Login Error', error);
        }
    };

    return (
        <div className='container'>
            <div className='login-container'>
                <div className='circle circle-one'></div>
                <div className='form-container bg-opacity-20 bg-white backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg p-8'>
                    <img
                        src='https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png'
                        alt='illustration'
                        className='illustration'
                    />
                    <h1 className='opacity-60 text-3xl'>LOGIN</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='block w-full p-3 my-4 rounded bg-opacity-10 bg-white text-white outline-none focus:ring focus:ring-blue-500'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='block w-full p-3 my-4 rounded bg-opacity-10 bg-white text-white outline-none focus:ring focus:ring-blue-500'
                        />
                        <button className='opacity-60 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-full transition duration-200' type='submit'>
                            SUBMIT
                        </button>
                    </form>
                    <div className='register-forget opacity-60'>
                        <a href='/signup'>REGISTER</a>
                        <a href='/forgot-password'>FORGOT PASSWORD</a>
                    </div>
                </div>
                <div className='circle circle-two'></div>
            </div>
            <div className='quote-container'>
                <p className='quote text-right text-white text-lg italic opacity-80'>
                    "Health is the greatest gift, <br />
                    contentment the greatest wealth, <br />
                    faithfulness the best relationship."
                </p>
            </div>
            <div className='theme-btn-container'></div>
        </div>
    );
}

export default HospitalLogin;
