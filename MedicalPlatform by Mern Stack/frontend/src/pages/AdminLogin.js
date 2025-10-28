import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3055/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      localStorage.setItem('token', 'token');
      localStorage.setItem('role', 'admin');
      localStorage.setItem('email', 'admin@gmail.com');
      navigate('/admin/page');
    } catch (error) {
      alert('Authentication failed. Please try again.');
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-purple-500 text-2xl mb-4 text-center">Admin Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-700 text-white w-full p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white w-full p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
