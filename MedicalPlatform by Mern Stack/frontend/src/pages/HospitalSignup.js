import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HospitalSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [departmentsInput, setDepartmentsInput] = useState(''); // Added state for departments input
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const departmentsArray = departmentsInput.split(',').map(dep => dep.trim());
        const departmentsObject = {};
        departmentsArray.forEach(dep => {
            departmentsObject[dep] = [];
        });

        try {
            const response = await fetch('http://localhost:3055/hospital/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNo,
                    area,
                    city,
                    password,
                    address,
                    description,
                    departments: departmentsObject
                }),
            })
            
            if (response.ok) {
                alert('Registration Successful');
                setName('');
                setEmail('');
                setPhoneNo('');
                setCity('');
                setArea('');
                setAddress('')
                setPassword('')
                setDepartmentsInput(''); 
                setDescription('');
                navigate('/doctor/login');
            } else {
                alert('Registration Unsuccessful');
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Unable to connect to the server:', error);
        }

        
        
    };

    return (
        <div className="signup-container flex justify-center items-center min-h-screen bg-gray-900">
            <div className="signup-content w-96 p-10 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-green-500 text-2xl mb-8">Sign Up</h2>
                <form className="signup-form" onSubmit={handleRegister}>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Hospital Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Departments (comma separated)"
                            value={departmentsInput}
                            onChange={(e) => setDepartmentsInput(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box mb-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full py-3 px-4 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="submit"
                            value="Sign Up"
                            className="w-full py-3 bg-green-500 text-black font-semibold rounded cursor-pointer transition duration-300 hover:bg-green-600"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HospitalSignUp;
