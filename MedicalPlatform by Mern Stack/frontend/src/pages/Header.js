import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const isUserSignedIn = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        navigate('/');
    };

    return (
        <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300'>
            <Link to='/'>
                <h1 className='text-3xl'>Medical Platform Website</h1>
            </Link>
            <ul className='flex gap-6'>
                <Link to='/doctors'>
                    <li>Doctors</li>
                </Link>
                {isUserSignedIn ? (
                    <>
                        {role === 'doctor' && (
                            <Link to='/doctor/profile'>
                                <li>Doctor Profile</li>
                            </Link>
                        )}
                        {role === 'admin' && (
                            <Link to='/admin/page'>
                                <li>Admin Page</li>
                            </Link>
                        )}
                        {role === 'patient' && (
                            <Link to='/patient/profile'>
                                <li>Patient Profile</li>
                            </Link>
                        )}
                        {role === 'hospital' && (
                            <Link to='/hospital/profile'>
                                <li>Hospital Profile</li>
                            </Link>
                        )}
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                        {role !== 'admin' && (
                            <>
                                <li>
                                    <Link to='/delete'>Delete Account</Link>
                                </li>
                                <li>
                                    <Link to='/password'>Change Password</Link>
                                </li>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Link to='/doctor/login'>
                            <li>Login</li>
                        </Link>
                        <Link to='/patient/signup'>
                            <li>Signup</li>
                        </Link>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Header;
