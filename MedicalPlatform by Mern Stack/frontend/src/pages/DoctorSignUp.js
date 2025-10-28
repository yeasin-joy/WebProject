import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [doctorEmail, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalEmail, setHospitalEmail] = useState('');
    const { email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await fetch(`http://localhost:3055/hospital/${email}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    const departmentNames = Object.keys(data.departments);
                    setDepartments(departmentNames);
                    setHospitalName(data.name)
                    setHospitalEmail(data.email)
                } else {
                    console.log('Unable to fetch hospital data');
                }
            } catch (error) {
                console.error('Unable to connect to the server:', error);
            }
        };

        fetchHospitalData();
    }, [email]);

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3055/doctor/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email: doctorEmail,
                    phoneNo,
                    specialty,
                    hospital: hospitalName,
                    department: selectedDepartment,
                    password, 
                    pdfs: [],
                    hospitalEmail
                })
            });

            if (response.ok) {
                alert('Registration Successful');
                setName('');
                setEmail('');
                setPhoneNo('');
                setSpecialty('');
                setPassword('');
                navigate('/hospital/profile');
            } else {
                alert('Registration Unsuccessful');
                console.log('Unable to register user');
            }
        } catch (error) {
            console.error('Unable to connect to the server:', error);
        }
    };

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-full bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-full p-9' onSubmit={handleRegister}>
                    <h4 className='text-purple-600 text-lg mb-4'>Doctor of {hospitalName}</h4>
                    <label>Name</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Name'
                        value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                    <label>Email</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Email'
                        value={doctorEmail} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                    <label>Phone Number</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Phone Number'
                        value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} /><br /><br />
                    <label>Degree</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Degree'
                        value={specialty} onChange={(e) => setSpecialty(e.target.value)} /><br /><br />
                    <label>Department</label><br />
                    <select className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                        <option value=''>Select Department</option>
                        {departments.map((department, index) => (
                            <option key={index} value={department}>{department}</option>
                        ))}
                    </select><br /><br />
                    <label>Password</label><br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='password' placeholder='Password'
                        value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                    <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>Sign Up</button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white'>Doctor SignUp Page</h2>
            </div>
        </div>
    );
}

export default SignUp;
