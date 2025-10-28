import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const isUserSignedIn = !!localStorage.getItem('token')
    if (isUserSignedIn) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-4xl text-center">Please Sign Out First!</h2>
            </div>
        );
    }
    

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3055/doctor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert('Invalid Credentials');
                throw new Error('Login failed.');
            }

            const data = await response.json();
            const token = data.token;
            const role = data.role
            alert('Login successful');
            setEmail('');
            setPassword('');
            if (role === 'patient') {
                navigate(`/patient/profile`);
                window.location.reload();
            }else if (role === 'doctor') {
                navigate(`/doctor/profile`);
                window.location.reload();
            } else {
                navigate(`/hospital/profile`);
                window.location.reload();
            }
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('email', data.user.email);
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' onSubmit={handleLogin}>
                    <label>Email</label>
                    <br />
                    <input
                        className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <label>Password</label>
                    <br />
                    <input
                        className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>
                        Login
                    </button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white '>Login</h2>
            </div>
        </div>
    );
}

export default DoctorLogin;
