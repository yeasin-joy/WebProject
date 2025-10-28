import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HospitalView = () => {
    const [hospitalDetails, setHospitalDetails] = useState(null);
    const [announcements, setAnnouncements] = useState(null);
    const { email } = useParams();
    const navigate = useNavigate();

    const patientEmail = localStorage.getItem('email') || '';
    const role = localStorage.getItem('role')
  
    const [formData, setFormData] = useState({
      patientName: '',
      patientEmail: patientEmail,
      selectedDepartment: '',
      selectedDoctor: '',
      hospitalEmail: email,
    });
  
    useEffect(() => {
      const fetchHospitalData = async () => {
        try {
          const response = await fetch(`http://localhost:3055/hospital/${email}`, {
              method: 'GET',
            });
          if (response.ok) {
            const data = await response.json();
            setHospitalDetails(data);
            setAnnouncements(data.announcements)
          } else {
            console.error('Failed to fetch hospital data');
          }
        } catch (error) {
          console.error('Error fetching hospital data:', error);
        }
      };
  
      fetchHospitalData();
    }, [email]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (role !== 'patient') {
        alert('Only patients are allowed to make appointments');
        navigate('/doctor/login')
        window.location.reload();
      }
      try {
        const response = await fetch('http://localhost:3055/hospital/appoinment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          console.log('Appointment successfully made');
          alert('Appointment successfully made');
          navigate('/patient/profile')
          window.location.reload();
        } else {
          console.error('Failed to make appointment');
        }
      } catch (error) {
        console.error('Error making appointment:', error);
      }
    };
  
    if (!hospitalDetails) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {/* Left side - Hospital Details */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">Hospital Details</h2>
          <div className="mb-4">
            <p><strong>Name:</strong> {hospitalDetails.name}</p>
            <p><strong>Email:</strong> {hospitalDetails.email}</p>
            <p><strong>Phone Number:</strong> {hospitalDetails.phoneNo}</p>
            <p><strong>City:</strong> {hospitalDetails.city}</p>
            <p><strong>Area:</strong> {hospitalDetails.area}</p>
            <p><strong>Address:</strong> {hospitalDetails.address}</p>
            <p><strong>Description:</strong> {hospitalDetails.description}</p>
          </div>
          <hr className="my-4" />
          <div>
            <h2 className="text-xl font-semibold mb-4">Announcements From The Hospital</h2>
            {announcements && announcements.length !== 0 ? (
              announcements.map((announcement, index) => (
                <div key={index} className="mb-4 border-2 border-red-400 rounded-lg p-4">
                  <p className="text-gray-700">{announcement[1]}</p>
                </div>
              ))
            ) : (
              <p>No announcements</p>
            )}
          </div>
        </div>
  
        {/* Right side - Appointment Form */}
        {role === 'patient' && (
          <div className="flex-1 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-4">Make an Appointment</h2>
            <h1 className='text-red-700 pb-5'>Visiting Fee {hospitalDetails.fee} Taka</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                  Patient Name
                </label>
                <input
                  className="form-input w-full border border-gray-300 rounded-md py-2 px-3"
                  id="patientName"
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="hidden"
                name="patientEmail"
                value={formData.patientEmail}
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Select Department
                </label>
                <select
                  className="form-select w-full border border-gray-300 rounded-md py-2 px-3"
                  id="department"
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {Object.keys(hospitalDetails.departments).map((departmentName, index) => (
                    <option key={index} value={departmentName}>{departmentName}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctor">
                  Select Doctor
                </label>
                <select
                  className="form-select w-full border border-gray-300 rounded-md py-2 px-3"
                  id="doctor"
                  name="selectedDoctor"
                  value={formData.selectedDoctor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {Object.keys(hospitalDetails.departments).map((departmentName, index) => (
                    <optgroup key={index} label={departmentName}>
                      {hospitalDetails.departments[departmentName].map((doctor, idx) => (
                        <option key={idx} value={doctor.name}>{doctor.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Make Appointment
              </button>
            </form>
          </div>)}
      </div>
    );
  };
  
  export default HospitalView;
