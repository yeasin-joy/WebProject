import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function DoctorProfile() {
    const [doctor, setDoctor] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    // const { email } = useParams();
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'doctor') {
            alert('Unauthorised to view this page');
            navigate('/doctor/login')
            window.location.reload();
        }
        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3055/doctor/${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setDoctor(data);
                    setIsLoading(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [email]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(email)
    console.log(doctor)

    return (
        <div className='w-full h-screen bg-gray-400 text-white flex justify-center items-center'>
            <div className='w-[600px]'>
                <h2 className='text-4xl mb-6 items-center'>Doctor's Profile</h2>

                <div className='bg-white rounded p-4 mb-4'>
                    <p><strong style={{ color: 'black' }}>Doctor: {doctor.name}</strong> </p>
                    <p><strong style={{ color: 'black' }}>Email Address: {doctor.email}</strong></p>
                    <p><strong style={{ color: 'black' }}>Degree: {doctor.specialty}</strong></p>
                    <p><strong style={{ color: 'black' }}>Phone Number: {doctor.phoneNo}</strong></p>
                    <p><strong style={{ color: 'black' }}>Hospital: {doctor.hospital}</strong></p>
                    <p><strong style={{ color: 'black' }}>Depertment of: {doctor.department}</strong></p>
                </div>

                <Link to={`/prescription/${doctor.name}`}>
                    <button className='w-full bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mb-4'>
                        Write Prescription
                    </button>
                </Link>
                <Link to={`/patients/${doctor.hospital}`}>
                    <button className='w-full bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mb-4'>
                        Patient Appointments List
                    </button>
                </Link>
                <Link to="/pdfs">
                    <button className='w-full bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded'>
                        View Patient Prescription Pdfs
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default DoctorProfile;
