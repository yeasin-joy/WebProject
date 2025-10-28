import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteProfile = () => {
  const [password, setPassword] = useState('');
  const userEmail = localStorage.getItem('email') || '';
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate();


  useEffect(() => {
    if (!isUserSignedIn) {
    alert('You need to Login before deleting you account!');
    navigate('/doctor/login')
    window.location.reload();
  }})

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:3055/doctor/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        console.log('Account deleted successfully');
        alert('Account deleted successfully!');
        navigate('/doctor/login')
        window.location.reload();
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="delete-profile-page flex justify-center items-center bg-black h-screen">
      <div className="delete-profile-box bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-red-500 text-lg font-semibold mb-4">Enter your Password if you want to Delete your account!</h2>
        <input
          type="password"
          className="bg-gray-700 text-white px-4 py-2 mb-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline text-center"
          onClick={handleDeleteAccount}
        >
          Confirm Deletion
        </button>
      </div>
    </div>
  );
};

export default DeleteProfile;
