import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewDoctor = () => {
    const [doctorDetails, setDoctorDetails] = useState(null);
    const { email } = useParams();
    const navigate = useNavigate();

    const patientEmail = localStorage.getItem('email') || '';
    const role = localStorage.getItem('role')
  
    const [formData, setFormData] = useState({
      patientName: '',
      patientEmail: patientEmail,
      selectedDepartment: '',
      selectedDoctor: '',
      hospitalName: ''
    });
  
    useEffect(() => {
      const fetchDoctorData = async () => {
        try {
          const response = await fetch(`http://localhost:3055/doctor/${email}`, {
              method: 'GET',
            });
          if (response.ok) {
            const data = await response.json();
            setDoctorDetails(data);
            setFormData({ ...formData, hospitalName: data.hospital, selectedDepartment: data.department, selectedDoctor: data.name })
          } else {
            console.error('Failed to fetch doctor data');
          }
        } catch (error) {
          console.error('Error fetching doctor data:', error);
        }
      };
  
      fetchDoctorData();
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
        const response = await fetch('http://localhost:3055/doctor/appoinment', {
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
  
    if (!doctorDetails) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {/* Left side - Doctor Details */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">Doctor Details</h2>
          <div className="mb-4">
            <p><strong>Name:</strong> {doctorDetails.name}</p>
            <p><strong>Email:</strong> {doctorDetails.email}</p>
            <p><strong>Phone Number:</strong> {doctorDetails.phoneNo}</p>
            <p><strong>Hospital:</strong> {doctorDetails.hospital}</p>
            <p><strong>Department:</strong> {doctorDetails.department}</p>
          </div>
        </div>
  
        {/* Right side - Appointment Form */}
        {role === 'patient' && (
          <div className="flex-1 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-4">Make an Appointment</h2>
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
              <input
                type="hidden"
                name="selectedDoctor"
                value={formData.selectedDoctor}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Make Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  export default ViewDoctor;
