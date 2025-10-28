import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [numPatients, setNumPatients] = useState(0);
  const [numDoctors, setNumDoctors] = useState(0);
  const [numHospitals, setNumHospitals] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3055/admin/counts', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch counts');
        }

        const data = await response.json()
        setNumPatients(data.patients);
        setNumDoctors(data.doctors);
        setNumHospitals(data.hospitals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3055/admin/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, selectedOption }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
      setUserData(userData);
      setSelectedOption('')
      setEmail('')
    } catch (error) {
        alert(error)
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3055/admin/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, selectedOption }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setSelectedOption('')
      setEmail('')
      setUserData(null);
      alert('User successfully deleted!')
      window.location.reload();
    } catch (error) {
        alert(error)
      console.error('Error deleting user:', error);
    }
  };
  

  return (
    <div>
    <div className="w-full">
        <h2 className="text-center bg-gray-800 text-red-600 pb-5 pt-5 text-4xl">Admin Page</h2>
    </div>
    <div className="h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-3/4 p-8 bg-gray-800 rounded-lg flex flex-col md:flex-row border border-black">
        <div className="md:w-1/2 md:pr-4 mb-8 md:border-r md:border-black text-center">
          <h2 className="text-xl font-bold mb-4 text-yellow-500">SignUp Hospital </h2>
          <button className="text-lg font-bold bg-transparent border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white">
            <Link to="/hospital/signup">Hospital SignUp</Link>
          </button>
          <div className='border border-blue-500 rounded-lg mt-4 p-4 mr-10 ml-10'>
          <h2 className="text-xl font-bold mb-4 text-purple-500">Users in Database</h2>
          <div className="mt-4">
            <p>Number of Patients: {numPatients}</p>
            <p>Number of Doctors: {numDoctors}</p>
            <p>Number of Hospitals: {numHospitals}</p>
          </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4 text-green-500">View or Delete User</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
          />
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-300 bg-gray-100 text-gray-800"
          >
            <option value="" disabled selected>Select Option</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital</option>
          </select>
          <button
            onClick={handleShowUserData}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Show
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:border-blue-300 mt-4"
          >
            Delete
          </button>
          {userData && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">User Data</h2>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phoneNo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminPage;
