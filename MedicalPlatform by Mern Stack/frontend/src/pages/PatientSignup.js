import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phoneNo,
      password
    };

    try {
      const response = await fetch('http://localhost:3055/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert('Registration Unsuccessful');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      navigate('/doctor/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container flex justify-center items-center min-h-screen bg-gray-900">
      <div className="signup-content w-96 p-10 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-green-500 text-2xl mb-8 text-center">Patient SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Enter Phone Number"
              autoComplete="off"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          <div className="input-box">
            <button type="submit" className="w-full py-3 bg-green-500 text-black font-semibold rounded cursor-pointer transition duration-300 hover:bg-green-600">
              Register
            </button>
          </div>
        </form>
        <p className='text-orange-400 mt-4 mb-4'>Already have an account?</p>
        <a href="/doctor/login" className="w-full py-3 bg-gray-300 text-black font-semibold rounded cursor-pointer transition duration-300 hover:bg-gray-400 block text-center text-decoration-none">
          Login
        </a>
      </div>
    </div>
  );
}

export default PatientSignup;
