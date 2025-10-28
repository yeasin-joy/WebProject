import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        role: ''
    });    
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const checkAuthDetails = () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        if (email && token && role) {
            setFormData({ ...formData, email, role });
        } else {
            alert('You can only change password after logging in!');
            navigate('/doctor/login');
            window.location.reload();
        }
    };
    
    useEffect(() => {
        checkAuthDetails();
    }, []);
    

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3055/doctor/change/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Password updated Successfully!');
                setError('');
                const currentPassword = ''
                const newPassword = ''
                setFormData({ ...formData, currentPassword, newPassword });
            } else {
                setError('An error occurred, please try again later');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred, please try again later');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-96 p-4 rounded-lg shadow-md bg-blue-100">
                {error && <p className="text-red-600">{error}</p>}
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="mb-2">
                        <label>Current Password:</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mb-3 border border-green-500 rounded text-black"
                        />
                    </div>
                    <div className="mb-2">
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mb-3 border border-green-500 rounded text-black"
                        />
                    </div>
                    <button type="submit" className="py-3 rounded border-none bg-green-400 text-blue-900 cursor-pointer hover:bg-blue-600">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
